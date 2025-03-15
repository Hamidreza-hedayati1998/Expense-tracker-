import React, { useState,useEffect } from 'react';
import Menuside from '../component/navbar-side'
import Header from '../component/header/navbar'
import styles from './layout.module.scss'
import Card from '../component/card'
import CustomInput from '../component/inputcustum'
import Buttoncustom from '../component/Buttoncustum'
import PiCharts from '../component/Reports/Picharts';
const Layout = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const savedTransactions = JSON
    .parse(localStorage.getItem('transactions')) || [];
    setTransactions(savedTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = () => {
    if (value.trim() !== '' && title.trim() !== ''&& date !=='') { 
      
      const newTransaction = {
        id: Date.now(), 
        title,
        value: parseFloat(value),
        date,
      };
      setTransactions([...transactions, newTransaction]);
    setTitle('');
    setValue('');
    setDate('');
  };

}
  const chartData = transactions.map((transaction) => ({
  name: transaction.title,
  value: transaction.value,
  }));
  const totalValue = transactions.reduce((sum, transaction) => sum + transaction.value, 0);
  return (
    <div className={styles.container}>
         <div className={styles.menuwrap}>
            <Menuside/>
         </div>

        <div className={styles.mainrwrap}>
           <Header/>
           <div className='flex h-[400px]'>
             <div className={styles.Card}>
               <Card >
               <h2 className="text-lg font-bold mb-4">  Add Transactions</h2>
               <CustomInput placeholder='Title'
               value={title}
               onChange={(e) => setTitle(e.target.value)}  />
               <CustomInput type='number' placeholder='Value'
                value={value}
                onChange={(e) => setValue(e.target.value)}/>
               <CustomInput type='date' 
                value={date}
                onChange={(e) => setDate(e.target.value)}/>
               <Buttoncustom label='Add Transaction' 
               onClick={handleAddTransaction}/>
               </Card>
             </div>
           
             <div className='w-[300px]'>
              <Card>
              <h2 className="text-lg font-bold mb-4">Transactions</h2>
              <ul>
                {transactions.map((transaction) => (
                  <li key={transaction.id} className="mb-2 flex border-b-2 border-[#e1e0e8]">
                    <p>
                      <strong>{transaction.title}</strong>: {transaction.value}$ (Date:   {new Date(transaction.date).toDateString()})
                    </p>
                  </li>
                ))}
              </ul>
              </Card>
             </div> 
             <div className='w-[500px]'>
              <Card>
                <h2 className="text-lg font-bold ">Chart</h2>
                <div className="flex justify-center items-center -mt-14">
                    <PiCharts data={chartData} totalValue={totalValue} />
                </div>
              </Card>
             </div> 
           </div>
          
           
        </div>
       
        
    </div>
  )
}

export default Layout