import React from "react";
import {v4 as uuidv4} from 'uuid';
import './App.css';
import Table from 'react-bootstrap/Table';
import {BsArrowUpDown} from "react-icons/bs";

function InvForm(props) {

  return (
    <form className="create-inv-form" onSubmit = {props.createInv}>
      <h2 className="form-header">Add to Inventory</h2>
      <select value={props.val.make} onChange={props.handleInput} name="make">
        <option value="" disabled>Make</option>
        <option value="Ford">Ford</option>
        <option value="Lincoln">Lincoln</option>
        <option value="Dodge">Dodge</option>
      </select>
      <select value={props.val.model} onChange={props.handleInput} name="model">
        <option value="" disabled>Model</option>
        <option value="Focus">Focus</option>
        <option value="Fusion">Fusion</option>
        <option value="F-150">F-150</option>
        <option value="MKZ">MKZ</option>
      </select>
      <select value={props.val.type} onChange={props.handleInput} name="type">
        <option value="" disabled>Type</option>
        <option value="Car">Car</option>
        <option value="Truck">Truck</option>
        <option value="SUV">SUV</option>
      </select>
      <input
        name="year"
        id="year"
        type="text"
        placeholder="Year"
        value = {props.val.year}
        autoComplete="off"
        onChange = {props.handleInput}
      />
      <input
        name="retailPrice"
        id="retailPrice"
        type="text"
        placeholder="Retail Price"
        value = {props.val.retailPrice}
        autoComplete="off"
        onChange = {props.handleInput}
      />
      <select value={props.val.featureDoors} onChange={props.handleInput} name="featureDoors">
        <option value="" disabled>Doors</option>
        <option value="2Door">2Door</option>
        <option value="4Door">4Door</option>
      </select>
      <select value={props.val.featureFuel} onChange={props.handleInput} name="featureFuel">
        <option value="" disabled>Fuel Type</option>
        <option value="Gas">Gas</option>
        <option value="Hybrid">Hybrid</option>
        <option value="Electric">Electric</option>
      </select>
      <select value={props.val.featureInterior} onChange={props.handleInput} name="featureInterior">
        <option value="" disabled>Interior</option>
        <option value="Cloth">Cloth</option>
        <option value="Leather">Leather</option>
      </select>
      <select value={props.val.featureTransmission} onChange={props.handleInput} name="featureTransmission">
        <option value="" disabled>Transmission</option>
        <option value="Automatic">Automatic</option>
        <option value="Manual">Manual</option>
      </select>
      <div className = "create-inv-submit"><button className="submit-btn" type="submit">
        Add Inventory
      </button></div>
    </form>
  );
}

function InvListItem(props) {
  const items = props.inv;
  const { make, model, stockid, year, type, retailPrice, featureDoors, featureFuel, featureTransmission, featureInterior, totalPrice } = items;
  return (
    <tbody>
      <tr>
        <td>{make}</td>
        <td>{model}</td>
        <td>{year}</td>
        <td>{type}</td>
        <td>{retailPrice}</td>
        <td>{featureDoors}</td>
        <td>{featureFuel}</td>
        <td>{featureTransmission}</td>
        <td>{featureInterior}</td>
        <td>{totalPrice}</td>
        <td><button className = "inv-toggle" onClick = {()=> props.toggleInv(stockid)}><BsArrowUpDown/></button></td>
        <td><button className = "inv-remove" onClick = {()=> props.deleteInv(stockid)}>X</button></td>
      </tr>
    </tbody>
  );
  
}

function InvtList(props) {
  const items = props.inv;
  const currinv = items.filter(item=> item.isSold === false);
  let totInv = 0.0;
  currinv.forEach( item => { 
    totInv+=parseInt(item.totalPrice);
    return totInv;
  });
  return (
    <div className= {`inv-list-${props.title}`}>
      <h2>{props.title}</h2>
      <h3>{totInv!== 0 ? `Total Value : $`+ totInv: ''}</h3>
      <Table striped bordered hover className="invList">
        <thead>
          <tr>
            <th scope="col">Make</th>
            <th scope="col">Model</th>
            <th scope="col">Year</th>
            <th scope="col">Type</th>
            <th scope="col">RetailPrice</th>
            <th scope="col" title = "2 Doors: $0 &#013;4 Doors: $2500">Doors</th>
            <th scope="col" title = "Gas: $0 &#013;Hybrid: $10000 &#013;Electric: $15000">Fuel</th>
            <th scope="col" title = "Automatic: $1000 &#013;Manual: $0">Transmission</th>
            <th scope="col" title = "Cloth: $0 &#013;Leather: $1500">Interior</th>
            <th scope="col">TotalPrice</th>
            <th scope="col">Toggle</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>  
        {items.map( item => {
          return(<InvListItem key = {item.stockid} inv={item} 
          deleteInv = {props.deleteInv} toggleInv = {props.toggleInv}/>)          
        })}
      </Table>
    </div>
  );
}
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inv: [
        {
          stockid: "asdfv",
          make: "Ford",
          model: "Focus",
          year: "2020",
          type: "Car",
          retailPrice: "16500",
          featureDoors: "2Door",
          featureFuel: "Hybrid",
          featureTransmission: "Auto",
          featureInterior: "Cloth",
          totalPrice: "27500",
          isSold: false
        },
        {
          stockid: "asdfvww",
          make: "Ford",
          model: "Fusion",
          year: "2021",
          type: "Car",
          retailPrice: "22000",
          featureDoors: "2Door",
          featureFuel: "Gas",
          featureTransmission: "Manual",
          featureInterior: "Cloth",
          totalPrice: "22000",
          isSold: false
        },
        {
          stockid: "asdfvdd11",
          make: "Lincoln",
          model: "MKZ",
          year: "2019",
          type: "Car",
          retailPrice: "34500",
          featureDoors: "2Door",
          featureFuel: "Gas",
          featureTransmission: "Manual",
          featureInterior: "Cloth",
          totalPrice: "34500",
          isSold: true
        }
      ],
      currentItem: {
        stockid: "",
        make: "",
        model: "",
        year: "",
        type: "",
        retailPrice: "",
        featureDoors: "",
        featureFuel: "",
        featureTransmission: "",
        featureInterior: "",
        totalPrice: "",
        isSold: false
      }
    }
    this.handleInput = this.handleInput.bind(this);
    this.createInv = this.createInv.bind(this);
    this.deleteInv = this.deleteInv.bind(this);
    this.toggleInv = this.toggleInv.bind(this);

  }

  createInv(e) {
    // create inventory 
    e.preventDefault();
    const newItem = this.state.currentItem;
    let tot = parseInt(newItem.retailPrice);
    if(newItem.featureDoors==='4Door'){
      tot+= 2500;
    }
    if(newItem.featureFuel==='Hybrid'){
      tot+=10000;
    }
    if(newItem.featureFuel==='Electric'){
      tot+=15000;
    }
    if(newItem.featureTransmission==='Automatic'){
      tot+=1000;
    }
    if(newItem.featureInterior==='Leather'){
      tot+=1500;
    }
    if (newItem.make!=="" && newItem.featureTransmission!=="") {
      newItem.totalPrice = tot;
      const newItems = [...this.state.inv, newItem]
      this.setState({
        inv: newItems,
        currentItem: {
          stockid: "",
          make: "",
          model: "",
          year: "",
          type: "",
          retailPrice: "",
          featureDoors: "",
          featureFuel: "",
          featureTransmission: "",
          featureInterior: "",
          totalPrice: "",
          isSold: false
        }
      })
    }
  }

  toggleInv(id) {
    // toggle inventory sold status here
    const items = this.state.inv;
    items.forEach(item => {
      if(item.stockid === id) {
        item.isSold = !item.isSold;
      }
    })
    this.setState ({
      inv: items
    })
  }

  deleteInv(id) {
    // delete inv here
    const filteredItems = this.state.inv.filter( item => item.stockid !== id);
    this.setState({
      inv: filteredItems
    })
  }

  handleInput(e) {
    let val = e.target.value;
    let name = e.target.name;
    this.setState({
      currentItem: {
        ...this.state.currentItem,
        stockid: uuidv4(),
        [name]: val,
        isSold: false
      }
    })
  }
  render() {
    return (
      <div>
      <div className="content">
        <h1 className="title">Carzone Inventory Management</h1>
        <InvForm createInv = {this.createInv} 
        val = {this.state.currentItem} handleInput = {this.handleInput}></InvForm>
      </div>
      <div className="lists-wrapper">
        <InvtList inv={this.state.inv.filter( item => item.isSold === false)} title="Inventory" 
        deleteInv = {this.deleteInv} toggleInv = {this.toggleInv}/>
        <InvtList inv={this.state.inv.filter( item => item.isSold === true)} title="Sold" 
        deleteInv = {this.deleteInv} toggleInv = {this.toggleInv}/>
      </div>
      </div>
    );
  }
}

export default App;