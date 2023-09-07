import { useEffect, useState } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { Db } from './Config'
import Logo from './assets/Icons/cup.png'
import './assets/styles/Home.css'

const Home = () => {
    const [Bill, AddBill] = useState(0)
    const [Cart, AddCart] = useState([{
        Name: "Hey", Price: "69"
    }])
    const [Prods, setProd] = useState([{
        Name: "", Img: "", Descrp: "", Price: "", ID: ""
    }])
    const ProdsRef = collection(Db, "Products")

    const RemCart = (Name: string, Price: string) => {
        AddCart([...Cart.filter((Cart) => Cart.Name !== Name)])
        AddBill(Bill - +(Price))
    }

    useEffect(() => {
        const qryProds = query(ProdsRef, orderBy('Name'))
        onSnapshot(qryProds, async (snapshot) => {
            let Prods: any = []

            snapshot.forEach((doc) => {
                Prods.push({...doc.data(), ID: doc.id})
            })
            setProd(Prods)
            RemCart("Hey", "0")
        })
    }, [])

    return (
        <>
        <nav className="navbar">
            <div className="container">
                <a className="navbar-brand">
                    <img src={Logo} alt="Logo" width="30" height="24" 
                        className="d-inline-block align-text-top" />
                    <span>CupsGallore</span>
                </a>
            </div>
        </nav>
        <br></br>
        <div className='Body container'>
            <div className='Products row'>
                {Prods.map((Prod) => (
                    <div className='card col' key={Prod.ID}>
                        <img src={Prod.Img} className='card-img-top' 
                            alt={Prod.Name} />
                        <div className='card-body'>
                            <h5 className='card-title'>{Prod.Name}</h5>
                            <a href='#' className='CartBtn btn btn-primary' 
                                onClick={() => {
                                    AddCart([...Cart, 
                                        {Name: Prod.Name, Price: Prod.Price}]
                                    )
                                    AddBill(Bill + +(Prod.Price))
                                }}>Add to Cart</a>
                        <h6 className='card-title'>Rs {Prod.Price}</h6>
                        <p className='card-text'>{Prod.Descrp}</p>
                        </div>
                    </div>
                ))}
                {/* <form className='card'>
                    <img src="" className='card-img-top' id='uploadedimage' 
                        alt="Image Here" />
                    <div className='card-body'>
                        <h5 className='card-title'>Name Here</h5>
                        <button type='submit' className='CartBtn btn btn-primary' 
                            >Save</button>
                    <h6 className='card-title'>Rs </h6>
                    <p className='card-text'></p>
                    </div>
                </form> */}
            </div>
            <div className='Cart'>
            <ul className="list-group">
                <h4 className='CartTitle'>Cart:</h4>
                <hr className="border border-light border-1 opacity-50" />
                {Cart.map((CartItem) => (
                    <li className='list-group-item'>
                        {CartItem.Name} <p>{CartItem.Price}</p><span>
                            <button type="button" className="btn btn-danger"
                                onClick={() => RemCart(CartItem.Name, CartItem.Price)}>
                                    Remove</button>
                            </span>
                    </li>
                ))}
                <h4 className='CartBill'>Total: {Bill}</h4>
            </ul>
            </div>
        </div>
        </>
    )
}

export default Home