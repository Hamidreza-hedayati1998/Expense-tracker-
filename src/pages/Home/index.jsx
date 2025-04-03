import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './home.module.scss';
import Card from '../../component/card';
import CustomInput from '../../component/inputcustum';
import Buttoncustom from '../../component/Buttoncustum';
import PiCharts from '../../component/Reports/Picharts';
import CustomSelected from '../../component/customSeleted';
import { IoMdClose } from "react-icons/io";
import { MdTravelExplore } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";
import { FaUtensils, FaUniversity } from 'react-icons/fa';

const HomePage = () => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [selectedcategory, setSelectedcategory] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [transactions, setTransactions] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('transactions')) || [];
        } catch {
            return [];
        }
    });
    
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search') || '';
    
    useEffect(() => {
        const loadData = () => {
            try {
                const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
                const walletExpenses = JSON.parse(localStorage.getItem('walletExpenses')) || [];
                
                if (savedTransactions.length > walletExpenses.length) {
                    localStorage.setItem('walletExpenses', JSON.stringify(savedTransactions));
                } else if (walletExpenses.length > savedTransactions.length) {
                    localStorage.setItem('transactions', JSON.stringify(walletExpenses));
                    setTransactions(walletExpenses);
                } else {
                    setTransactions(savedTransactions);
                }
            } catch (error) {
                console.error('Error loading data:', error);
            }
        };
         
        loadData();
    }, []);
  
    useEffect(() => {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }, [transactions]);

    const filteredTransactions = transactions.filter(transaction => {
        const titleMatch = transaction.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = transaction.selectedcategory?.toLowerCase().includes(searchTerm.toLowerCase());
        return titleMatch || categoryMatch;
    });

    const getTimeDifference = (trDate) => {
        const timeDifference = (new Date()) - (new Date(trDate)); 
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const weeksDifference = Math.floor(daysDifference / 7);
    
        if (weeksDifference === 0) {
            if (daysDifference === 0) {
                return 'Today';
            } else {
                return `${daysDifference} ${daysDifference === 1 ? 'day' : 'days'} ago`;
            }
        } else {
            return `${weeksDifference} ${weeksDifference === 1 ? 'week' : 'weeks'} ago`;
        }
    };

    const handleAddTransaction = () => {
        if (value.trim() !== '' && title.trim() !== '' && date !== '' && selectedcategory !== '') {
            try {
                const expenseValue = parseFloat(value);
                const currentBalance = parseFloat(localStorage.getItem('walletBalance')) || 0;
                
                if (expenseValue > currentBalance) {
                    alert(`Insufficient funds! You have ${currentBalance}$ in wallet`);
                    return;
                }
    
                const newTransaction = {
                    id: Date.now(),
                    selectedcategory: selectedcategory === "other" ? category : selectedcategory,
                    category,
                    title,
                    value: expenseValue,
                    date: date || new Date().toISOString(),
                    type: 'expense'
                };
                
                
                const updatedTransactions = [...transactions, newTransaction];
                setTransactions(updatedTransactions);
                
                
                const newBalance = currentBalance - expenseValue;
                localStorage.setItem('walletBalance', newBalance.toString());
                
                
                const currentExpenses = JSON.parse(localStorage.getItem('walletExpenses') || []);
                const updatedExpenses = [...currentExpenses, newTransaction];
                localStorage.setItem('walletExpenses', JSON.stringify(updatedExpenses));
                
                
                setTitle('');
                setValue('');
                setDate('');
                setCategory('');
                setSelectedcategory('');
                setShowCustomInput(false);
    
            } catch (error) {
                console.error('Error adding transaction:', error);
            }
        }
    };

    const handleSelectChange = (e) => {
        const value = e.target.value;
        setSelectedcategory(value);
    
        if (value === 'other') {
            setShowCustomInput(true);
        } else {
            setShowCustomInput(false);
            setCategory('');
        }
    };
    
    const sortedTransactions = [...filteredTransactions].sort((a, b) => 
        new Date(b.date) - new Date(a.date));
    
    const removeTransaction = (id) => {
        const transactionToRemove = transactions.find(t => t.id === id);
        if (!transactionToRemove) return;
    
        const currentBalance = parseFloat(localStorage.getItem('walletBalance')) || 0;
        const newBalance = currentBalance + transactionToRemove.value;
        localStorage.setItem('walletBalance', newBalance.toString());
    
        const updatedTransactions = transactions.filter(t => t.id !== id);
        setTransactions(updatedTransactions);
    
        const updatedExpenses = JSON.parse(localStorage.getItem('walletExpenses') || [])
            .filter(t => t.id !== id);
        localStorage.setItem('walletExpenses', JSON.stringify(updatedExpenses));
    };

    const chartData = transactions.map((transaction) => ({
        name: transaction.title,
        value: transaction.value,
    }));
    
    const totalValue = transactions.reduce((sum, transaction) => sum + transaction.value, 0);

    return (
        <div className={styles.container}>
            <div className={styles['home-content']}>
                
                <div className={styles['card-container']}>
                    <Card>
                        <h2 className={`${styles['text-lg']} ${styles['font-bold']} ${styles['mb-4']}`}>
                            Add Expense
                        </h2>
                        <CustomSelected 
                            option1='food'
                            label1='Food'
                            option2='university' 
                            label2='University'
                            option3='travel' 
                            label3='Travel'
                            option4='other'
                            label4='Other'
                            value={selectedcategory} 
                            onChange={handleSelectChange}
                        />
                        {showCustomInput && (
                            <CustomInput 
                                placeholder='Enter custom category'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        )}
                        <CustomInput 
                            placeholder='Expense title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <CustomInput 
                            type='number' 
                            placeholder='Amount'
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <CustomInput 
                            type='date' 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <Buttoncustom 
                            label='Add Expense' 
                            onClick={handleAddTransaction}
                        />
                    </Card>
                </div>

                
                <div className={styles['card-container']}>
                    <Card>
                        <h2 className={`${styles['text-lg']} ${styles['font-bold']} ${styles['mb-4']}`}>
                            Recent Expenses
                        </h2>
                        <div className={styles['scroll-container']}>
                            <ul>
                                {sortedTransactions.map((transaction) => (
                                    <li key={transaction.id} className={styles['transaction-item']}>
                                        <div className={styles['transaction-content']}>
                                            <div className={styles['transaction-title']}>
                                                {transaction.selectedcategory === "food" && <FaUtensils className={styles['transaction-category-icon']} />}
                                                {transaction.selectedcategory === "university" && <FaUniversity className={styles['transaction-category-icon']} />}
                                                {transaction.selectedcategory === "travel" && <MdTravelExplore className={styles['transaction-category-icon']} />}
                                                <strong>{transaction.title}</strong>
                                                <span className={styles['transaction-amount']}>
                                                    ${transaction.value}
                                                    <AiOutlineDollar className={styles['text-green']} />
                                                </span>
                                            </div>
                                            <p className={styles['transaction-date']}>
                                                {getTimeDifference(transaction.date)}
                                            </p>
                                        </div>
                                        <button 
                                            onClick={() => removeTransaction(transaction.id)}
                                            className={styles['text-red']}
                                        >
                                            <IoMdClose />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Card>
                </div>

                
                <div className={styles['card-container']}>
                    <Card>
                        <h2 className={`${styles['text-lg']} ${styles['font-bold']}`}>
                            Expenses Chart
                        </h2>
                        <div className={styles['chart-container']}>
                            <PiCharts data={chartData} totalValue={totalValue} />
                            <div className={styles['total-expenses']}>
                                <span className={styles['text-xl']}>Total Expenses: </span>
                                <span className={styles['font-bold']}>${totalValue.toFixed(2)}</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default HomePage;