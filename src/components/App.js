import React, { Component } from 'react';
import './App.css';
        
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
const memeHash1=null
class App extends React.Component {
 
 constructor(props) {
    super(props);
    this.state = {
      buffer:null,
      memeHash:'QmNei5ub74g2N6avDZyqwNBHxC5hsm5DAUbZRuHiHHvwRZ',
      count:0,
      list:'',
      url:'https://api.qrserver.com/v1/create-qr-code/?data=https://ipfs.infura.io/ipfs/',
      url2:'&amp',
      
     };
   }

   
   
  captureFile=(event)=>
   {
     event.preventDefault()
    //process file for ipfs
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend =() =>
     {
      this.setState({buffer:Buffer(reader.result)})
     }
   }
    onSubmit=(event)=>
    {
     event.preventDefault()
     console.log("submitting the form....")
   
     ipfs.add
     ( this.state.buffer,(error,result)=>
       {
       console.log('Ipfs result',result)
       const memeHash = result[0].hash
      
       this.setState({
        count: this.state.count + 1,
        list: this.state.list +"\n"+ (this.state.count) +"."+" "+ (this.state.memeHash),
       
    });
       this.setState({memeHash})
       if(error){
        console.error(error)
        return
       }
     
        }  
      )
      
  }
 
  render() {
    return (
     
      <div className='background' >     
<div>
    <div className='background' >
        <nav className="navbar navbar-dark fixed-center bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.cutm.ac.in"
            target="_blank"
            rel="noopener noreferrer"
          >
           CENTURION BLOCKCHAIN SYSTEM v2.5  
           
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div style={{
       }
       }>
            <main role="main" className="col-lg-12 d-flex text-left">
              <div className="content mr-auto ml-auto">
             
                <a>
                  <img src={`https://ipfs.infura.io/ipfs/${this.state.memeHash}`}/>
                </a>
                <p></p>
                <h1 > DECENTRALIZE FILE STORAGE QR-DAPP</h1>
                <h3></h3>
                <p></p>
               
                <form onSubmit={this.onSubmit}>
         
                <p></p>
                <input type='file' onChange={this.captureFile} />
                
                <input type='submit'/>
                       
                <p></p>
                 <img src={this.state.url+this.state.memeHash+this.state.url2}
            alt=""
            title="QR CODE()"
            width="150"
            height="150"
            align="right" />
             
                <h3 className='Hashblock'>Hash Of Recent Block</h3>
                <textarea value={this.state.memeHash} />
                <h3 className='Hashblock'>Numbers Of Validated Records</h3>
                <textarea value={this.state.count}/>
                <h3 className='Hashblock'>Hash Of Validated Records</h3>
                <textarea value={this.state.list}/>
                <p></p>          
                </form>
                <form>
                  <h3>
         <label className='Hashblock' htmlFor="UserName">UserName</label></h3>
         <input
           type="text"
           name="username"
           value={this.state.username}
           onChange={this.handleChange}
         />
       </form>
               
              </div>
            </main>
           </div>
          </div>
         </div>
       </div>
      </div>
    );
  }
}


export default App