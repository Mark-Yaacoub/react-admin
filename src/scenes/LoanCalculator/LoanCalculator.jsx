import { Box, Button, Grid, TextField , Alert  } from "@mui/material";
import React, { useState } from "react";
import Header from "../../components/Header";

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [totalLoan, setTotalLoan] = useState("");

  const handleLoanAmountChange = (event) => {
    setLoanAmount(event.target.value);
  };

  const handleLoanTermChange = (event) => {
    setLoanTerm(event.target.value);
  };

  const handleInterestRateChange = (event) => {
    setInterestRate(event.target.value);
  };

  const handleCalculate = (event) => {
    event.preventDefault();

    const monthlyInterestRate = interestRate / 1200;
    const totalPayments = loanTerm * 12;
    const compoundedInterestRate = Math.pow(
      1 + monthlyInterestRate,
      totalPayments
    );

    const monthlyPaymentValue =
      (loanAmount *
        monthlyInterestRate *
        compoundedInterestRate) /
      (compoundedInterestRate - 1);

    setMonthlyPayment(monthlyPaymentValue.toFixed(2));

    const totalLoanValue = (monthlyPaymentValue * totalPayments).toFixed(2);
    setTotalLoan(totalLoanValue);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Loan Calculator"
          subtitle="Welcome to your Loan Calculator"
        />
      </Box>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleCalculate}>
              <Box m="20px">
                <TextField
                  fullWidth
                  id="loan-amount"
                  label="Loan Amount"
                  type="number"
                  value={loanAmount}
                  onChange={handleLoanAmountChange}
                  required
                />
              </Box>
              <Box m="20px">
                <TextField
                  fullWidth
                  id="loan-term"
                  label="Loan Term"
                  type="number"
                  value={loanTerm}
                  onChange={handleLoanTermChange}
                  required
                />
              </Box>
              <Box m="20px">
                <TextField
                  fullWidth
                  id="interest-rate"
                  label="Interest Rate"
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  required
                />
              </Box>
              <Box  m="20px">
              <Button variant="contained" color="success" type="submit">
              Calculate
            </Button>
              </Box>
              
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            {monthlyPayment && (
               <Box flex="1" m="80px">
               <Alert severity="success">Monthly Payment: ${monthlyPayment}</Alert>
               <br></br>
               <Alert severity="success">Total Loan: ${totalLoan}</Alert>
             </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default LoanCalculator;
