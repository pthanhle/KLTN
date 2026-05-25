import express from "express";
import {
  getAllContracts,
  getContractById,
  createContract,
  updateContract,
  deleteContract,
} from "../../controllers/admin/customerContract.controller.js";

const router = express.Router();

router.route("/").get(getAllContracts).post(createContract);
router.route("/:id").get(getContractById).put(updateContract).delete(deleteContract);

export default router;
