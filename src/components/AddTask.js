import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Controller, useForm } from 'react-hook-form';
import 'react-markdown-editor-lite/lib/index.css';
import { sweetAlert, sweetAlertToast } from '../utilities/helper';
import { UserContext } from '../store';
import useLogOut from '../utilities/logOut';
import Input from './Input';
import Select from './Select';
import MdTextarea from './MdTextarea';

function AddTask() {
  const navigate = useNavigate();
  const logOut = useLogOut();
  const { userName, accessToken } = useContext(UserContext);
  const [repos, setRepos] = useState([]);
  const defaultVal = useRef({
    title: '',
    body: '',
    repo: '',
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: defaultVal.current,
    mode: 'onTouched',
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `https://api.github.com/repos/${userName}/${data.repo}/issues`,
        {
          title: data.title,
          body: data.body,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      updateIssue(res.data);
      sweetAlertToast('Added successfully', 'success', 2000);
      setTimeout(() => {
        navigate('/tasklist');
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    //表單送出後，reset 表單
    if (formState.isSubmitSuccessful) {
      reset(defaultVal.current);
    }
  }, [formState]);

  useEffect(() => {
    const getRepos = async () => {
      try {
        const response = await axios.get('https://api.github.com/user/repos', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            affiliation: 'owner,collaborator',
          },
        });
        setRepos(response.data.filter((repo) => !repo.private));
      } catch (error) {
        if (error?.response?.status === 401) {
          sweetAlert('Login timeout, please login again', 'error');
          logOut();
        }
        console.log(error);
      }
    };
    getRepos();
  }, []);

  const updateIssue = async ({ repository_url, number }) => {
    try {
      const repoName = new URL(repository_url).pathname.split('/')[3];
      const owner = localStorage.getItem('userName');
      const response = await axios.patch(
        `https://api.github.com/repos/${owner}/${repoName}/issues/${number}`,
        {
          assignees: [owner],
          labels: ['open'],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h4 className='text-primary'>Create Task</h4>
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
            labelText='Repository'
            id='repo'
            rules={{
              required: { value: true, message: 'Repository is required' },
            }}
          >
            <option value='' disabled>
              Select a repository
            </option>
            {repos.map((repo) => (
              <option key={repo.id} value={repo.name}>
                {repo.name}
              </option>
            ))}
          </Select>
        </div>
        <button
          type='submit'
          className='btn btn-primary rounded-pill actionBtn'
        >
          Create
        </button>
      </form>
    </>
  );
}

export default AddTask;
