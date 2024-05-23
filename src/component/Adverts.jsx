import React from 'react'
import './Advert.css'
import vid from './videos/makevid.mp4'
import primer from './images/face_primer.jpg'
const Advert = () => {
  return (
    <>
      <div className="Advert">
        <div className="top-content">

          <div className="video-container">
            <video className='my-video' controls loop autoplay>
              <source src={vid} type="video/mp4" />

            </video>
          </div>
        </div>


        <div className="cardo">
          <img className="card__photo" src={primer} alt="Your Image Alt" />
          <div className="name">
            <p>Name</p>
          </div>
        </div>


      </div>

    </>


  )
}

export default Advert