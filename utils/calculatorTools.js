/**
 * calculatorTools.js — Utility helpers for Calculator Tools calculations.
 */

export function calculateDiscount(price, percentage) {
  if (isNaN(price) || isNaN(percentage) || price <= 0 || percentage < 0) {
    return { valid: false, discountAmount: 0, finalPrice: 0 };
  }
  
  const discountAmount = price * (percentage / 100);
  const finalPrice = price - discountAmount;
  
  return {
    valid: true,
    discountAmount: Math.round(discountAmount),
    finalPrice: Math.round(finalPrice)
  };
}

// Mode 1: What is X% of Y
export function calculatePercentageOfValue(percentage, value) {
  if (isNaN(percentage) || isNaN(value)) return { valid: false, result: 0 };
  
  return {
    valid: true,
    result: (percentage / 100) * value
  };
}

// Mode 2: X is what percent of Y
export function calculateWhatPercent(valX, valY) {
  if (isNaN(valX) || isNaN(valY) || valY === 0) return { valid: false, result: 0 };
  
  return {
    valid: true,
    result: (valX / valY) * 100
  };
}

// Mode 3: Percentage Change from A to B
export function calculatePercentageChange(oldValue, newValue) {
  if (isNaN(oldValue) || isNaN(newValue) || oldValue === 0) return { valid: false, result: 0, isIncrease: false };
  
  const diff = newValue - oldValue;
  const result = (diff / Math.abs(oldValue)) * 100;
  
  return {
    valid: true,
    result: Math.abs(result),
    isIncrease: diff >= 0
  };
}

export function calculateAge(dobStr, compareDateStr = null) {
  if (!dobStr) return { valid: false, years: 0, months: 0, days: 0 };
  
  const dob = new Date(dobStr);
  let compareDate = compareDateStr ? new Date(compareDateStr) : new Date();
  
  if (isNaN(dob.getTime()) || isNaN(compareDate.getTime())) {
    return { valid: false, years: 0, months: 0, days: 0 };
  }
  
  if (compareDate < dob) {
    return { valid: false, error: 'Tanggal pembanding harus setelah tanggal lahir' };
  }

  let years = compareDate.getFullYear() - dob.getFullYear();
  let months = compareDate.getMonth() - dob.getMonth();
  let days = compareDate.getDate() - dob.getDate();

  if (days < 0) {
    const previousMonthDate = new Date(compareDate.getFullYear(), compareDate.getMonth(), 0);
    days += previousMonthDate.getDate();
    months--;
  }

  if (months < 0) {
    months += 12;
    years--;
  }

  return {
    valid: true,
    years,
    months,
    days
  };
}
