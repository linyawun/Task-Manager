import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';
import { sweetAlertToast } from '../utilities/helper';
import { Controller, useForm } from 'react-hook-form';
import 'react-markdown-editor-lite/lib/index.css';
import { UserContext } from '../store';
import Input from './Input';
import Select from './Select';
import MdTextarea from './MdTextarea';

const EditTask = () => {
  const { userName, accessToken } = useContext(UserContext);
  const { owner, repo, issueNumber } = useParams();
  const [paramsIsVaild, setParamsIsVaild] = useState(true);
  const [issue, setIssue] = useState([]);
  const defaultVal = useRef({
    title: '',
    body: '',
    state: '',
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: defaultVal.current,
    mode: 'onTouched',
  });

  const onSubmit = (data) => {
    updateIssue(data);
  };

  const getIssue = async () => {
    try {
      const res = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`
      );
      setParamsIsVaild(true);
      setIssue(res.data);
    } catch (error) {
      if (error?.response?.status === 404) {
        setParamsIsVaild(false);
      }
      console.error(error);
    }
  };

  const updateIssue = async ({ title, body, state }) => {
    try {
      const owner = userName;
      const response = await axios.patch(
        `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`,
        {
          title,
          body,
          labels: [state],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      sweetAlertToast('Updated successfully', 'success', 2000);
      setTimeout(() => {
        window.location.href = '/tasklist';
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getIssue();
  }, []);

  useEffect(() => {
    setValue('title', issue?.title);
    setValue('body', issue?.body);
    setValue('state', issue?.labels?.[0]?.name.toLowerCase());
  }, [issue]);

  return !paramsIsVaild ? (
    <Navigate to='/404' />
  ) : (
    <>
      <h4 className='text-primary'>Edit Task</h4>
      <form onSubmit={handleSubmit(onSubmit)} className='mb-6'>
        <div className='mb-3'>
          <Input
            register={register}
            errors={errors}
            id='title'
            type='text'
            labelText='Title'
            rules={{
              required: {
                value: true,
                message: 'Title is required',
              },
            }}
          />
        </div>
        <div className='mb-3'>
          <MdTextarea
            Controller={Controller}
            labelText='Body'
            id='body'
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Body is required',
              },
              minLength: {
                value: 30,
                message: 'Length must be at least 30',
              },
            }}
          />
        </div>
        <div className='mb-4'>
          <Select
            register={register}
            errors={errors}
            labelText='State'
            id='state'
            rules={{ required: { value: true, message: 'State is required' } }}
          >
            <option value='' disabled>
              Select a state
            </option>
            <option value='open'>Open</option>
            <option value='in progress'>In Progress</option>
            <option value='done'>Done</option>
          </Select>
        </div>
        <button
          type='submit'
          className='btn btn-primary rounded-pill actionBtn'
        >
          Save
        </button>
      </form>
    </>
  );
};

export default EditTask;
