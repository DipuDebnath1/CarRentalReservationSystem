import httpStatus from 'http-status';
import AppError from '../../ErrorHandler/AppError';
import { TCar } from './car.interface';
import { CarCollection } from './car.model';

// post a car
const createCarIntoDB = async (payload: TCar) => {
  const result = await CarCollection.create(payload);
  return result;
};

// get all car
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllCarIntoDB = async (status: any) => {
  const query = {
    status: status,
  };

  if (status) {
    const result = await CarCollection.find(query);
    return result;
  }
  //
  const result = await CarCollection.find();
  return result;
};

// find cars
const getAllCarWithSearchCriteriaIntoDB = async (payload: Partial<TCar>) => {
  const params: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    name?: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    features?: any;
    type?: string;
    status?: string;
    isDeleted?: string;
  } = {};

  if (payload?.name) params.name = { $regex: payload?.name, $options: 'i' };
  if (payload?.features)
    params.features = { $regex: payload?.features, $options: 'i' };
  // if (payload?.features) params.features = { $in: payload?.features };
  if (payload?.type) params.type = payload?.type;
  params.status = 'available';

  try {
    const res = await CarCollection.find(params);
    return res;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new AppError(httpStatus.NOT_FOUND, err.message);
  }
};
// get a car
const getSingleCarIntoDB = async (id: string) => {
  const result = await CarCollection.findById(id);
  if (!result) return;

  return result;
};

// update a car
const updateSingleCarIntoDB = async (id: string, payload: Partial<TCar>) => {
  const result = await CarCollection.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (!result) return;

  return result;
};

//delete a car
const deleteACar = async (id: string) => {
  const result = await CarCollection.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!result) return;

  return result;
};

export const carService = {
  createCarIntoDB,
  getAllCarIntoDB,
  getSingleCarIntoDB,
  updateSingleCarIntoDB,
  deleteACar,
  getAllCarWithSearchCriteriaIntoDB,
};
