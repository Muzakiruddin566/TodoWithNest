import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomButton from './Button';
export default function List({ item }) {
    const deleteItem = async (id) => {
        try {
            const remove = await axios.delete(`http://localhost:4000/todo/${id}`);
            console.log(remove);
        } catch (error) {
            console.log(error);
        }
    }

    const udpateData = async (id) => {
    
        try {
            const update = await axios.patch(`http://localhost:4000/todo/${id}`, {
                status:true
            });
            console.log(update);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="row" style={{ 'borderBottom': '1px solid gray' }} key={item._id}>
            <div className="col-6">
                <div className="content">
                    <h1 style={{ "color": "yellow" }} className= {`${item.status ? 'addtextDec' : ""}`}>{item.Name}</h1>
                    <p className= {`${item.status ? 'addtextDec' : ""}`}>{item.description}</p>
                </div>
            </div>
            <div className="col-6 text-end mt-5">
                <CustomButton size='sm' variant='warning' className="rounded margin-right-10 " onClick={() => udpateData(item._id)} disable={item.status}> Complete</CustomButton>
                <CustomButton size='sm' variant='warning' className="rounded margin-right-10" onClick={() => deleteItem(item._id)} disable={item.status } > Delete</CustomButton>
            </div>
        </div>
    )
}
