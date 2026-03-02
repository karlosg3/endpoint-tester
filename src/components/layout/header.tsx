import codeLogo from '../../assets/Code.svg'

function Header() {
    return (
        <header>
            <div className='logo-container'>
                <a href="https://github.com/karlosg3/endpoint-tester" target="_blank">
                    <img src={codeLogo} className="logo" alt="Code logo" />
                </a>
                <h1 className='title'>ARO Endpoint Tester</h1>
            </div>
            <div className='subtitle-container'>
                <a href="#EnpointTester" className='subtitle'>Tester</a>
                <a href="#Documentation" className='subtitle'>Documentation</a>
                <a href="https://github.com/karlosg3/endpoint-tester" target="_blank" className='subtitle'>GitHub</a>
            </div>
        </header>
    )
}

export default Header