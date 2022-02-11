import React from 'react';
import styles from '../Dashboard/Dashboard.module.css'
import { Container } from '@material-ui/core';

const sales = () => {
  return (
    <div className={styles.pageContainer}>
        <Container>
          <h1> /Sales</h1>
          <h2> Sales Dashboard</h2>
        </Container>
    
    <section className={styles.stat}>
    <ul className={styles.autoGrid}>
                <li className={styles.listItem} style={{backgroundColor: '#1976d2', color: 'white'}}>
                    <div>
                        <h2 style={{color: 'white'}}>Payment Received</h2>
                    </div>
                    <div>
                    </div>
                </li>

                <li className={styles.listItem} >
                    <div>
                        <h2>Pending Amount</h2>
                    </div>
                    <div>
                    </div>
                </li>

                <li className={styles.listItem} >
                    <div>
                        <h2>Total Amount</h2>
                    </div>
                    <div>

                    </div>
                </li>

                <li className={styles.listItem} >
                    <div>
                        <h2>Total Invoices</h2>
                    </div>
                    <div>
                    </div>
                </li>


                <li className={styles.listItem} style={{backgroundColor: '#206841', color: 'white'}}>
                    <div>
                        <h2 style={{color: 'white'}}>Paid Invoices</h2>
                    </div>
                    <div>
                    </div>
                </li>

                <li className={styles.listItem} >
                    <div>
                        <h2>Partially Paid Invoices</h2>
                    </div>
                    <div>
                    </div>
                </li>

                <li className={styles.listItem} >
                    <div>
                        <h2>Unpaid Invoices</h2>
                    </div>
                    <div>
                    </div>
                </li>

                <li className={styles.listItem} >
                    <div>
                        <h2>Overdue</h2>
                    </div>
                    <div>
                    </div>
                </li>
                
         
        </ul>

    </section>


        <section>
            <div>
            <div className={styles.table}>
               
                <table>
                    <tbody>
                    </tbody>
                </table>
            </div>
            </div>
        </section>
   
</div>
  
  )
  
};

export default sales;
