import { useState } from 'react'
import codeLogo from '../../assets/Code.svg'
import './Home.css'
import '../../components/layout/header/header'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://github.com/karlosg3/endpoint-tester" target="_blank">
          <img src={codeLogo} className="logo" alt="Code logo" />
        </a>
      </div>
      <h1>ARO Endpoint Tester</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          This repo is a simple endpoint tester for the ARO API. It is built with React and Vite.
        </p>
        <p>
          You can find the source code on GitHub by clicking on the Code Logo above.
        </p>
        <p>
          All you need to do is fill the TextBox with your endpoint and click the button to test it. The response will be displayed below the button.
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Code Logo to visit the GitHub repository.
      </p>
    </>
  )
}

export default Home
