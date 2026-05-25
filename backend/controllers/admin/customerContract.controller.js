import Contract from "../../models/contractModel.js";
import User from "../../models/userModel.js";
import Car from "../../models/carModel.js";

export const getAllContracts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", customerId, sort = "createdAt", order = "desc" } = req.query;

    let query = {};
    
    if (customerId) {
      query.customer = customerId;
    }

    if (search) {
      const users = await User.find({
        $or: [
          { full_name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ]
      }).select('_id');
      const userIds = users.map(u => u._id);

      const cars = await Car.find({
        $or: [
          { name: { $regex: search, $options: "i" } },
          { brandName: { $regex: search, $options: "i" } },
        ]
      }).select('_id');
      const carIds = cars.map(c => c._id);

      const searchConditions = [
        { contract_number: { $regex: search, $options: "i" } },
        { customer: { $in: userIds } },
        { vehicle: { $in: carIds } }
      ];

      if (customerId) {
        query.$and = [
          { customer: customerId },
          { $or: searchConditions }
        ];
        delete query.customer;
      } else {
        query.$or = searchConditions;
      }
    }

    const sortObject = {};
    sortObject[sort] = order === "asc" ? 1 : -1;

    const contracts = await Contract.find(query)
      .populate("customer", "full_name email phone")
      .populate("vehicle", "name slug brandName")
      .sort(sortObject)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Contract.countDocuments(query);

    res.json({
      success: true,
      data: contracts,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getContractById = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id)
      .populate("customer", "full_name email phone address")
      .populate("vehicle", "name slug brandName image price");

    if (!contract) {
      return res.status(404).json({ success: false, message: "Không tìm thấy hợp đồng" });
    }

    res.json({
      success: true,
      data: contract,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createContract = async (req, res) => {
  try {
    const {
      customer,
      vehicle,
      contract_type,
      total_value,
      attachments,
      note,
      status
    } = req.body;

    const contract_number = `HD-${Date.now()}`;

    const newContract = await Contract.create({
      contract_number,
      customer,
      vehicle,
      contract_type,
      total_value,
      attachments,
      note,
      status: status || "draft",
    });

    res.status(201).json({
      success: true,
      data: newContract,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateContract = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedContract = await Contract.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedContract) {
      return res.status(404).json({ success: false, message: "Không tìm thấy hợp đồng" });
    }

    res.json({
      success: true,
      data: updatedContract,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteContract = async (req, res) => {
  try {
    const contract = await Contract.findByIdAndDelete(req.params.id);

    if (!contract) {
      return res.status(404).json({ success: false, message: "Không tìm thấy hợp đồng" });
    }

    res.json({
      success: true,
      message: "Đã xóa hợp đồng thành công",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
