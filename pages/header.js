import React from 'react'
import '../styles/global.css'
import '../styles/landingPage.css'

function header() {
    return (
        <div className="header">
            <p style={{ color: '#A9DFCF', fontWeight: 'bold', fontSize: '20px' }}>ZiZi&apos;sS RECIPES</p>
            <button style={{ color: '#FF5F66', width: '80px', height: '50px', fontSize: '15px', color: 'white', background: '#FF5F66', border: 'none', borderRadius: '5px' }}>Login</button>
        </div>
    )
}

export default header
