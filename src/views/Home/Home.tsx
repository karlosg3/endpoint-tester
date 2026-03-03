import codeLogo from '../../assets/Code.svg'
import './Home.css'
import '../../components/layout/header/header'
import { Link } from 'react-router-dom'

function Home() {

  return (
    <>
    <div className='home-container'>
      <div className='main-display'>
        <div className='logo-container'>
          <Link to='https://github.com/karlosg3/endpoint-tester' className='link-logo'>
            <img src={codeLogo} className='logo' alt='Code Logo' />
          </Link>
        </div>
        <div className='separator' />
        <div className='info-container'>
          <h1 className='info-header'><span className='info-span'>DARO</span> Endpoint Tester</h1>
          <div className='info-separator' />
          <p className='info-text'>
            This repo is a simple endpoint tester created by the DARO team.
            It is built with React and Vite. You can find the source code on
            our GitHub repository by clicking on the Code Logo aside. All you
            need to do is fill the Text Box with your endpoint and click the
            button to test it. The response will be displayed below the button.
          </p>
        </div>
      </div>
    </div>
      {/* <div>
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
      </p> */}
    </>
  )
}

export default Home
