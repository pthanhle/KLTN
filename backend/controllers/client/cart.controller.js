import Cart from '../../models/cartModel.js'
import Product from '../../models/productModel.js'
import asyncHandler from 'express-async-handler'

const convertBrokenObjectToString = (obj) => {
  if (!obj || typeof obj !== 'object') return null

  const plainObj = obj.toObject ? obj.toObject() : obj

  const numericKeys = Object.keys(plainObj).filter(key => /^\d+$/.test(key))

  if (numericKeys.length === 0) return null

  numericKeys.sort((a, b) => parseInt(a) - parseInt(b))
  const reconstructedUrl = numericKeys.map(key => plainObj[key]).join('')

  if (reconstructedUrl.startsWith('http')) {
    return reconstructedUrl
  }

  return null
}

const getFirstImage = (product) => {
  if (!product) return ''

  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    const firstImage = product.images[0]

    if (typeof firstImage === 'string' && firstImage.trim()) {
      return firstImage
    }

    if (typeof firstImage === 'object' && firstImage !== null) {
      if (firstImage.image_url) return firstImage.image_url
      if (firstImage.url) return firstImage.url

      const reconstructed = convertBrokenObjectToString(firstImage)
      if (reconstructed) return reconstructed
    }
  }

  if (product.image) {
    if (typeof product.image === 'string') return product.image
    if (typeof product.image === 'object') {
      const reconstructed = convertBrokenObjectToString(product.image)
      if (reconstructed) return reconstructed
    }
  }

  return ''
}

const mapCartItem = (item) => {
  return {
    product_id: item.product_id._id,
    product_name: item.product_id.product_name,
    price: parseFloat(item.product_id.price),
    quantity: item.quantity,
    image: getFirstImage(item.product_id),
    category: item.product_id.category_id?.category_name || 'Chưa phân loại',
    type: item.product_id.type || 'product',
  }
}


export const getCart = asyncHandler(async (req, res) => {
  try {
    console.log('Getting cart for user:', req.user._id)

    const cart = await Cart.findOne({ user_id: req.user._id })
      .populate({
        path: 'items.product_id',
        select: 'product_name price images image category_id stock_quantity type',
        populate: { path: 'category_id', select: 'category_name' },
      })

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.json({ items: [], total: 0 })
    }

    let total = 0
    const items = cart.items.map(item => {
      if (!item.product_id) {
        return null
      }

      const price = parseFloat(item.product_id.price)
      const quantity = item.quantity
      total += price * quantity

      return mapCartItem(item)
    }).filter(item => item !== null)

    res.json({
      items: items,
      total: total,
    })
  } catch (error) {
    console.error('Error in getCart:', error)
    res.status(500).json({ message: error.message })
  }
})


export const addToCart = asyncHandler(async (req, res) => {
  const { product_id, quantity } = req.body

  if (!product_id || !quantity || quantity < 1) {
    res.status(400)
    throw new Error('Vui lòng cung cấp product_id và số lượng hợp lệ')
  }

  const product = await Product.findById(product_id).populate('category_id', 'category_name')
  if (!product) {
    console.error('Product not found:', product_id)
    res.status(404)
    throw new Error('Sản phẩm không tồn tại')
  }

  if (product.stock_quantity < quantity) {
    res.status(400)
    throw new Error(`Số lượng trong kho không đủ. Chỉ còn ${product.stock_quantity} sản phẩm`)
  }

  let cart = await Cart.findOne({ user_id: req.user._id })

  if (!cart) {
    cart = await Cart.create({
      user_id: req.user._id,
      items: [{ product_id, quantity }],
    })
  } else {
    const itemIndex = cart.items.findIndex(item => item.product_id.toString() === product_id)
    if (itemIndex > -1) {
      const newQuantity = cart.items[itemIndex].quantity + quantity
      if (product.stock_quantity < newQuantity) {
        res.status(400)
        throw new Error(`Số lượng trong kho không đủ. Chỉ còn ${product.stock_quantity} sản phẩm`)
      }
      cart.items[itemIndex].quantity = newQuantity
    } else {
      cart.items.push({ product_id, quantity })
    }
    await cart.save()
  }

  const updatedCart = await Cart.findById(cart._id).populate({
    path: 'items.product_id',
    select: 'product_name price images image category_id stock_quantity type',
    populate: { path: 'category_id', select: 'category_name' },
  })

  const validItems = updatedCart.items.filter(item => item.product_id !== null)

  const total = validItems.reduce((sum, item) => {
    return sum + (parseFloat(item.product_id.price) * item.quantity)
  }, 0)

  res.status(201).json({
    message: 'Thêm vào giỏ hàng thành công',
    cart: {
      items: validItems.map(mapCartItem),
      total: parseFloat(total),
    },
  })
})


export const updateCartItem = asyncHandler(async (req, res) => {
  const { product_id, quantity } = req.body

  if (!product_id || !quantity || quantity < 1) {
    res.status(400)
    throw new Error('Vui lòng cung cấp product_id và số lượng hợp lệ')
  }

  const cart = await Cart.findOne({ user_id: req.user._id })
  if (!cart) {
    res.status(404)
    throw new Error('Giỏ hàng không tồn tại')
  }

  const itemIndex = cart.items.findIndex(item => item.product_id.toString() === product_id)
  if (itemIndex === -1) {
    res.status(404)
    throw new Error('Sản phẩm không có trong giỏ hàng')
  }

  const product = await Product.findById(product_id)
  if (!product) {
    res.status(404)
    throw new Error('Sản phẩm không tồn tại')
  }

  if (product.stock_quantity < quantity) {
    res.status(400)
    throw new Error(`Số lượng trong kho không đủ. Chỉ còn ${product.stock_quantity} sản phẩm`)
  }

  cart.items[itemIndex].quantity = quantity
  await cart.save()

  const updatedCart = await Cart.findById(cart._id).populate({
    path: 'items.product_id',
    select: 'product_name price images image category_id type',
    populate: { path: 'category_id', select: 'category_name' },
  })

  const validItems = updatedCart.items.filter(item => item.product_id !== null)

  const total = validItems.reduce((sum, item) => {
    return sum + (parseFloat(item.product_id.price) * item.quantity)
  }, 0)

  res.json({
    message: 'Cập nhật giỏ hàng thành công',
    cart: {
      items: validItems.map(mapCartItem),
      total: parseFloat(total),
    },
  })
})


export const removeFromCart = asyncHandler(async (req, res) => {
  const product_id = req.params.product_id

  const cart = await Cart.findOne({ user_id: req.user._id })
  if (!cart) {
    res.status(404)
    throw new Error('Giỏ hàng không tồn tại')
  }

  const itemIndex = cart.items.findIndex(item => item.product_id.toString() === product_id)
  if (itemIndex === -1) {
    res.status(404)
    throw new Error('Sản phẩm không có trong giỏ hàng')
  }

  cart.items.splice(itemIndex, 1)
  await cart.save()

  const updatedCart = await Cart.findById(cart._id).populate({
    path: 'items.product_id',
    select: 'product_name price images image category_id type',
    populate: { path: 'category_id', select: 'category_name' },
  })

  const validItems = updatedCart ? updatedCart.items.filter(item => item.product_id !== null) : []

  const total = validItems.reduce((sum, item) => {
    return sum + (parseFloat(item.product_id.price) * item.quantity)
  }, 0)

  res.json({
    message: 'Xóa sản phẩm khỏi giỏ hàng thành công',
    cart: {
      items: validItems.map(mapCartItem),
      total: parseFloat(total),
    },
  })
})


export const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user_id: req.user._id })
  if (!cart) {
    res.status(404)
    throw new Error('Giỏ hàng không tồn tại')
  }

  await cart.deleteOne()
  res.json({ message: 'Xóa toàn bộ giỏ hàng thành công', cart: { items: [], total: 0 } })
})