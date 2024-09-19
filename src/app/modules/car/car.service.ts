import { TCar } from './car.interface';
import { CarCollection } from './car.model';

// post a car
const createCarIntoDB = async (payload: TCar) => {
  const result = await CarCollection.create(payload);
  return result;
};

// get all car
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllCarIntoDB = async (status:any) => {
  const query = {
    status:status
  }

  if (status) {
    const result = await CarCollection.find(query);    
    return result;
  }
// 
  const result = await CarCollection.find();
  return result;
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
};
