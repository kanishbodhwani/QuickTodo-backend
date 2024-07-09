import { RequestHandler } from 'express';
import {
  createUserQuery,
  getUsersQuery,
  getUserWithIdQuery,
  updateUserQuery,
  deleteUserQuery
} from '../services/queries.js';
import { success, error } from '../utils/response.js';
import { Timestamp } from 'firebase/firestore';

export const createUser: RequestHandler = async (req, res) => {
  try {
    const data = req.body;
    data.created_at = Timestamp.fromDate(new Date());
    const docId = await createUserQuery(data);

    // returning the id of the created user
    res.status(200).json(success('User created successfully', docId, 200));
  } catch (e) {
    res.status(500).json(error('Something went wrong!', 500));
  }
};

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await getUsersQuery();
    if (users.length === 0) {
      res.status(404).json(error('No users found', 404));
    } else {
      res.status(200).json(success('Users retrieved successfully', users, 200));
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error('Something went wrong!', 500));
  }
};

export const getUserWithId: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserWithIdQuery(id);
    if (user) {
      res.status(200).json(success('User retrieved successfully', user, 200));
    } else {
      res.status(404).json(error('No user found of provided id', 404));
    }
  } catch (error) {
    res.status(500).json(error('Something went wrong!', 500));
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await updateUserQuery(id, req.body);
    res.status(200).json(success('User updated successfully', user, 200));
  } catch (error) {
    res.status(500).json(error('Something went wrong!', 500));
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteUserQuery(id);
    res.status(200).json(success('User deleted successfully', null, 200));
  } catch (error) {
    res.status(500).json(error('Something went wrong!', 500));
  }
};
