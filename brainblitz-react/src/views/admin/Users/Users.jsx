import React, { useEffect, useState } from 'react'
import AxiosClient from '../../../AxiosClient';
import { Link } from 'react-router-dom';

export default function Users() {

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  let count = 1;

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    AxiosClient.get('/admin/users')
      .then(({ data }) => {
        setUsers(data.users);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.error(err); 
      });
  };

  const deleteButton = (user, event) => {
    event.preventDefault(); 
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    AxiosClient.delete(`/admin/users/${user.id}/delete`)
      .then(() => {
        setUsers(prevUsers => prevUsers.filter(m => m.id !== user.id));
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="card">
      <div className="card-header d-flex">
        <h3 className="card-title mr-auto pt-2">Users Table</h3>
      </div>

      <div className="card-body">
        <table id="example2" className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7} className='text-center'>Loading...</td>
              </tr>
            )}
            {!loading && (
              <>
                {users.length > 0 ? (
                  users.map((s, index) => (
                    <tr key={s.id}>
                      <td>{index + 1}</td>
                      <td>{s.name}</td>
                      <td width={500}>{s.email}</td>
                      <td className='d-flex'>
                        <div className='border-none'>
                          <Link to={`/admin/users/${s.id}/edit`} className='btn btn-success mt-2 px-4 mr-4'>Edit</Link>
                          <button
                            type="button"
                            className='btn btn-danger px-3 mt-2'
                            onClick={(event) => deleteButton(s, event)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className='text-center'>No Data</td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
