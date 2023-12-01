import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'


const Layout = (props) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name='description' content={props.description} />
                <meta name='keywords' content={props.keywords} />
                <meta name='author' content={props.author} />
                <title>{props.title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: '80vh' }}>
                
                {props.children}
            </main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'E-commerce app - shopNow',
    description: 'MERN Stack Project',
    keywords: 'react node mongodb express',
    author: 'Muzammil Ahmed Khan'
}

export default Layout