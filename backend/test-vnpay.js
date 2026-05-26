import { vnpayConfig } from './config/vnpayConfig.js'
import { validatePaymentMethodDetailed } from './utils/paymentValidation.js'
import crypto from 'crypto'
import moment from 'moment'

// Test VNPay URL generation with standardized payment method
function testVNPayURLGeneration() {
  console.log('=== Testing VNPay URL Generation ===')

  // Test payment method validation
  const paymentValidation = validatePaymentMethodDetailed('vnpay')
  console.log('Payment method validation result:', paymentValidation)

  // Mock order data
  const mockOrder = {
    _id: '507f1f77bcf86cd799439011',
    amount: 100000
  }

  const mockPayment = {
    _id: '507f1f77bcf86cd799439012'
  }

  // Generate VNPay parameters
  const validAmount = Math.floor(Number(mockOrder.amount))
  const createDate = moment().format('YYYYMMDDHHmmss')

  let vnp_Params = {}
  vnp_Params['vnp_Version'] = '2.1.0'
  vnp_Params['vnp_Command'] = 'pay'
  vnp_Params['vnp_TmnCode'] = vnpayConfig.vnp_TmnCode
  vnp_Params['vnp_Locale'] = 'vn'
  vnp_Params['vnp_CurrCode'] = 'VND'
  vnp_Params['vnp_TxnRef'] = mockPayment._id.toString()
  vnp_Params['vnp_OrderInfo'] = 'Thanh toan don hang ' + mockOrder._id
  vnp_Params['vnp_OrderType'] = 'other'
  vnp_Params['vnp_Amount'] = validAmount * 100
  vnp_Params['vnp_ReturnUrl'] = vnpayConfig.vnp_ReturnUrl
  vnp_Params['vnp_IpAddr'] = '127.0.0.1'
  vnp_Params['vnp_CreateDate'] = createDate

  console.log('VNPay parameters before sorting:', vnp_Params)

  vnp_Params = sortObject(vnp_Params)
  console.log('VNPay parameters after sorting:', vnp_Params)

  const signData = Object.keys(vnp_Params).map(key => key + '=' + vnp_Params[key]).join('&')
  console.log('Sign data:', signData)

  const hmac = crypto.createHmac('sha512', vnpayConfig.vnp_HashSecret)
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')
  console.log('Generated signature:', signed)

  vnp_Params['vnp_SecureHash'] = signed

  const paymentUrl = vnpayConfig.vnp_Url + '?' + Object.keys(vnp_Params).map(key => key + '=' + vnp_Params[key]).join('&')

  console.log('=== Test Results ===')
  console.log('Payment method is valid:', paymentValidation.isValid)
  console.log('Payment method is VNPay:', paymentValidation.isVNPay)
  console.log('Normalized method:', paymentValidation.normalizedMethod)
  console.log('Display name:', paymentValidation.displayName)
  console.log('Generated VNPay URL length:', paymentUrl.length)
  console.log('VNPay URL:', paymentUrl)

  const url = new URL(paymentUrl)
  const params = new URLSearchParams(url.search)

  console.log('=== URL Validation ===')
  console.log('URL is valid:', url.href === paymentUrl)
  console.log('Required parameters present:')
  console.log('- vnp_Version:', params.get('vnp_Version'))
  console.log('- vnp_Command:', params.get('vnp_Command'))
  console.log('- vnp_TmnCode:', params.get('vnp_TmnCode'))
  console.log('- vnp_Amount:', params.get('vnp_Amount'))
  console.log('- vnp_TxnRef:', params.get('vnp_TxnRef'))
  console.log('- vnp_SecureHash:', params.get('vnp_SecureHash') ? 'Present' : 'Missing')

  return {
    success: true,
    paymentValidation,
    url: paymentUrl,
    urlLength: paymentUrl.length,
    hasRequiredParams: !!(params.get('vnp_Version') && params.get('vnp_Command') && params.get('vnp_TmnCode') && params.get('vnp_Amount') && params.get('vnp_TxnRef') && params.get('vnp_SecureHash'))
  }
}

function sortObject(obj) {
  let sorted = {}
  let str = []
  let key
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key))
    }
  }
  str.sort()
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+')
  }
  return sorted
}

// Run the test
try {
  const result = testVNPayURLGeneration()
  console.log('\n=== Final Test Result ===')
  console.log('Test passed:', result.success && result.hasRequiredParams)
  console.log('All required parameters present:', result.hasRequiredParams)
  console.log('Payment method validation passed:', result.paymentValidation.isValid)

  if (result.success && result.hasRequiredParams && result.paymentValidation.isValid) {
    console.log('✅ VNPay URL generation test PASSED')
    process.exit(0)
  } else {
    console.log('❌ VNPay URL generation test FAILED')
    process.exit(1)
  }
} catch (error) {
  console.error('Test failed with error:', error)
  process.exit(1)
}