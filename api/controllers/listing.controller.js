import Listing from "../models/listing.model.js";

export const createList = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteList = async (req, res, next) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).json("Success delete");
  } catch (error) {
    next(error);
  }
};

export const updateList = async (req, res, next) => {
  try {
    const updateList = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).json(updateList);
  } catch (error) {
    next(error);
  }
};

export const getListById = async (req, res, next) => {
  try {
    const list = await Listing.findById(req.params.id);
    if (!list) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "List not found",
      });
    }
    return res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let insurance = req.query.insurance;

    if (insurance === undefined || insurance === "false") {
      insurance = { $in: [false, true] };
    }

    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === "All") {
      type = { $in: ["Sell", "Rent"] };
    }

    let transmission = req.query.transmission;
    if (transmission === undefined || transmission === "All") {
      transmission = { $in: ["Automatic", "Manual"] };
    }

    let fuel = req.query.fuel;
    if (fuel === undefined || fuel === "All") {
      fuel = { $in: ["Oil", "Gas", "Electric"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      type,
      transmission,
      fuel,
      insurance,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
