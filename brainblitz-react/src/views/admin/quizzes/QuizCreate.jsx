import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AxiosClient from '../../../AxiosClient';


export default function QuizCreate() {

    const titleRef = useRef();
    const imageRef = useRef();
    const option1Ref = useRef();
    const option2Ref = useRef();
    const option3Ref = useRef();
    const option4Ref = useRef();
    const answerRef = useRef();
    const difficultyRef = useRef();
    const navigate = useNavigate();

    const [errors, setErrors] = useState('');

    const quizCreate = (e) => {
        e.preventDefault();

        var answer = null;

        if(answerRef.current.value > 0) {
        if(answerRef.current.value == 1) {
          answer = option1Ref.current.value;
        } else if(answerRef.current.value == 2){
          answer = option2Ref.current.value;
        }
        else if(answerRef.current.value == 3){
          answer = option3Ref.current.value;
        } else {
          answer = option4Ref.current.value;
        } }

        const formData = {
            title : titleRef.current.value,
            // image: imageRef.current.value,
            answer: answer,
            difficulty: difficultyRef.current.value,
            option1: option1Ref.current.value,
            option2: option2Ref.current.value,
            option3: option3Ref.current.value,
            option4: option4Ref.current.value,
        }

        AxiosClient.post('/admin/quizzes/create' , formData)
        .then(() => {
          navigate('/admin/quizzes');
        })

    }

  return (
    <div className='card'>
      <div className="card-header d-flex">
        <Link className='btn btn-info mr-3' to={'/admin/quizzes'}>Back</Link>
        <h3 className="card-title pt-2">Add New Quiz</h3>
      </div>
      <div className="card-body">
        <div className="container-fluid">
          <div className="row">
            <form onSubmit={quizCreate} className="col-lg-6">

              <div className="mb-3">
                <label className='form-label'>Title</label>
                <input ref={titleRef} type="text" className='form-control' />
                {errors && errors['title'] && (<p className="text-danger text-sm">{errors['name']}</p>)}
              </div>
              <div className="mb-3">
                <label className='form-label'>Image</label>
                <input ref={imageRef} type="file" className='form-control' />
                {errors && errors['image'] && (<p className="text-danger text-sm">{errors['image']}</p>)}
              </div>
              <div className="mb-3">
                <label className='form-label'>Option 1</label>
                <input ref={option1Ref} type="text" className='form-control' />
                {errors && errors['option1'] && (<p className="text-danger text-sm">{errors['option1']}</p>)}
              </div>
              <div className="mb-3">
                <label className='form-label'>Option 2</label>
                <input ref={option2Ref} type="text" className='form-control' />
                {errors && errors['option2'] && (<p className="text-danger text-sm">{errors['option2']}</p>)}
              </div>
              <div className="mb-3">
                <label className='form-label'>Option 3</label>
                <input ref={option3Ref} type="text" className='form-control' />
                {errors && errors['option3'] && (<p className="text-danger text-sm">{errors['option3']}</p>)}
              </div>
              <div className="mb-3">
                <label className='form-label'>Option 4</label>
                <input ref={option4Ref} type="text" className='form-control' />
                {errors && errors['option4'] && (<p className="text-danger text-sm">{errors['option4']}</p>)}
              </div>
              <div className="mb-3">
                <label className='form-label'>Answer</label>
                <select className='form-control' ref={answerRef} >
                  <option value="0">------ Select Right Answer ------</option>
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                  <option value="3">Option 3</option>
                  <option value="4">Option 4</option>                  
                </select>
              </div>
              <div className="mb-3">
                <label className='form-label'>Difficulty</label>
                <select className='form-control' ref={difficultyRef} >
                  <option value="0">------ Select Difficulty ------</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>  
                  <option value="hard">Hard</option>              
                </select>
              </div>

              <div className="mb-4">
                <button className='btn btn-info px-4'>ADD</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
