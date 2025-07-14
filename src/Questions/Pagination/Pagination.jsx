import React, { useEffect, useState } from 'react'
import './Pagination.css'

const ProductCard = ({ title, image }) => {
    return <span className='productCard'>
        <img src={image} />
        <h3>{title}</h3>
    </span>
}

const ITEMS_PER_PAGE = 10;


const Pagination = () => {

    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(0)

    const fetchData = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products?limit=1000')
            const data = await response.json()
            setProducts(data.products)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    const totalNumberOfPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    const startProduct = currentPage * ITEMS_PER_PAGE;
    const endProduct = startProduct + ITEMS_PER_PAGE;

    console.log(currentPage)
    console.log(`im total ${totalNumberOfPages}`)

    return (
        <div className='container'>
            <div className='paginationContainer'>
                <span className='paginationNumber' hidden={currentPage == startProduct} onClick={() => {
                    setCurrentPage(prev => prev - 1)
                }}>{'L'}</span>
                {[...Array(totalNumberOfPages).keys()].map((element) => {
                    return <span key={element} className={`paginationNumber ${currentPage == element ? 'active' : ''}`} onClick={() => setCurrentPage(element)}>{element + 1}</span>
                })}
                <span hidden={currentPage + 1 == totalNumberOfPages} className='paginationNumber' onClick={() => {
                    setCurrentPage(prev => prev + 1)
                }}>{'R'}</span>
            </div>
            <div className='productContainer'>
                {products.slice(startProduct, endProduct).map((product) => (
                    <ProductCard key={product.id} title={product.title} image={product.images[0]} />
                ))}
            </div>
        </div>
    )
}

export default Pagination