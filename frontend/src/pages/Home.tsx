import React from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
        Welcome to the Concall Summarizer


        <button onClick={() => navigate("/search")}>Go to search</button>
     </div>
  )
}

export default Home
