import React, { useEffect, useState } from 'react'
import AxiosClient from '../../../AxiosClient';
import { Link } from 'react-router-dom';

export default function Quizzes() {
    const [loading, setLoading] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    let count = 1;
  
    useEffect(() => {
      getQuizzes();
    }, []);
  
    const getQuizzes = () => {
      setLoading(true);
      AxiosClient.get('/admin/quizzes')
        .then(({ data }) => {
          setQuizzes(data.quizzes);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          console.error(err); 
        });
    };
  
    const deleteButton = (quiz, event) => {
      event.preventDefault(); 
      if (!window.confirm('Are you sure you want to delete this quiz?')) {
        return;
      }
      AxiosClient.delete(`/admin/quizzes/${quiz.id}/delete`)
        .then(() => {
          setQuizzes(prevQuizzes => prevQuizzes.filter(m => m.id !== quiz.id));
        })
        .catch(err => {
          console.error(err);
        });
    };
  
    return (
      <div className="card">
        <div className="card-header d-flex">
          <h3 className="card-title mr-auto pt-2">Quizzes Table</h3>
          <Link className='btn btn-info' to={'/admin/quizzes/create'}>Add New Quiz</Link>

        </div>
  
        <div className="card-body">
          <table id="example2" className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Options</th>
                <th>Correct Answer</th>
                <th>Difficulty</th>
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
                  {quizzes.length > 0 ? (
                    quizzes.map((s, index) => (
                      <tr key={s.id}>
                        <td>{index + 1}</td>
                        <td>{s.title}</td>
                        <td width={500}>1. {s.option1},  2. {s.option2}, <br /> 3. {s.option3}, 4. {s.option4}</td>
                        <td>{s.answer}</td>
                        <td>{s.difficulty}</td>
                        <td className='d-flex'>
                          <div className='border-none'>
                            <Link to={`/admin/quizzes/${s.id}/edit`} className='btn btn-success mt-2 px-4 mr-4'>Edit</Link>
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
