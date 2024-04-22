---
sidebar_position: 2
title: Formula Functions
---

Use operators and functions when building formulas. All functions are available everywhere that you can include a formula such as formula fields, validation rules, approval processes, and workflow rules, unless otherwise specified.

Translate mathematical and logical operators and functions for use in formulas. Unless otherwise specified, all functions are applicable in any context where formulas are used, such as formula fields, validation rules, approval processes, and workflow rules.

## Mathematical Operators

### + Addition

Calculates the sum of two values.

**Usage:** `Value 1 + Value 2`, replacing each value with merge fields, expressions, or other numerical values.

**Return Value:** Numerical

```javascript
Amount + Maint_Amount__c + Services_Amount__c
```

This formula calculates the total of the product Amount, Maintenance Amount, and Service Fees. Note that Maint amount and Service Fees are custom currency fields.

```javascript
Monday_Hours__c + Tuesday_Hours__c + Wednesday_Hours__c + Thursday_Hours__c + Friday_Hours__c > 40
```

Use this formula in a validation rule to display the error message "Total working hours cannot exceed 40 hours" when the sum of hours entered for each workday exceeds 40. This example requires five custom fields for each workday on a custom object.

### - Subtraction

Calculates the difference between two values.

**Usage:** `Value 1 - Value 2`, combining fields, expressions, or other numerical values to replace each value.

**Return Value:** Numerical

```javascript
Amount - Discount_Amount__c
```

This formula calculates the difference between the product Amount and the Discount Amount. Note that Discount Amount is a custom currency field.

### * Multiplication

Multiplies its values.

**Usage:** `Value 1 * Value 2`, replacing each value with merge fields, expressions, or other numerical values.

**Return Value:** Numerical

```javascript
Consulting_Days__c * 1200
```

This formula calculates the numerical value of consulting days multiplied by 1200, assuming this formula field is of currency data type and consulting is charged at a rate of $1200 per day. Note that Consulting Days is a custom field.

### / Division

Divides by its value.

**Usage:** `Value 1 / Value 2`, replacing each value with merge fields, expressions, or other numerical values.

**Return Value:** Numerical

```javascript
AnnualRevenue/ NumberOfEmployees
```

This formula uses the Amount field to calculate the revenue per employee.

```javascript
IF(NumberOfOpportunities > 0,  NumberOfWonOpportunities / NumberOfOpportunities, null)
```

This formula calculates the win rate of opportunities in a marketing campaign.

### ^ Power

Raises a number to the power of a specified number.

**Usage:** `Number^Integer`, replacing the number with merge fields, expressions, or other numerical values, and the integer with merge fields, expressions, or any integer.

**Return Value:** Numerical

```javascript
NumberOfEmployees^4
```

Calculates the fourth power of the number of employees.

> Avoid using negative integers

### () Brackets

Specifies to first calculate the expressions within the left and right brackets. All other expressions are evaluated using standard operator precedence.

**Usage:** `(Expression 1) Expression 2...`, replacing each expression with merge fields, expressions, or other numerical values.

```javascript
(Unit_Value__c - Old_Value__c) / New_Value__c
```

Calculates the difference between the old and new values, divided by the new value.

## Logical Operators

### = and == (Equal To)

Calculates whether two values are equal. The = and == operators are interchangeable.

**Usage:** `Expression 1 = Expression 2 or Expression 1 == Expression 2`, replacing each expression with merge fields, expressions, or other numerical values.

**Return Value:** Boolean

```javascript
ExpiringDate = CreatedDate + 5
```

Returns true if the expiration date equals the sum of the record's creation date and five days.

```javascript
IF(Probability = 1, ROUND(Amount*0.02, 2), 0)
```

This formula calculates the commission amount. Opportunities with a 100% probability are calculated at 2% commission. All other opportunities have a commission value of zero.

Opportunities with a 90% Probability will not receive a commission.

Opportunities with a 100% Probability and an Amount of $100,000 will receive a $2,000 commission.

> Do not use this function for null comparisons, such as MyDateTime__c == null. Instead, use ISBLANK.

### != (Not Equal To)

Calculates whether two values are not equal.

**Usage:** `Expression 1 <> Expression 2` or `Expression 1 != Expression 2`, replacing each expression with merge fields, expressions, or other numerical values.

**Return Value:** Boolean

```javascript
IF(Maint_Amount__c + Services_Amount__c != Amount, "DISCOUNTED", "FULL PRICE")
```

If the sum of the product's maintenance and service amounts is not equal to the product amount, this formula will display "DISCOUNTED" on the product. Otherwise, it shows "FULL PRICE". Note that this example uses two custom currency fields for Maint Amount and Services Amount.

> Do not use this function for null comparisons, such as MyDateTime__c != null. Instead, use ISBLANK.

### < (Less Than)

Calculates whether a value is less than the value following this symbol.

**Usage:** `Value 1 < Value 2`, replacing each value with merge fields, expressions, or other numerical values.

**Return Value:** Boolean

```javascript
IF(AnnualRevenue < 1000000, 1, 2)
```

Assigns the value "1" to revenue less than a million, and the value "2" to revenue greater than a million.

### > (Greater Than)

Calculates whether a value is greater than the value following this symbol.

**Usage:** `Value 1 > Value 2`, replacing each value with merge fields, expressions, or other numerical values.

**Return Value:** Boolean

```javascript
IF(commission__c > 1000000, "High Net Worth", "General")
```

Assigns the "High Net Worth" value to commissions greater than a million. Note that this is a text formula field using the commission custom field.

### `<=` (Less Than or Equal To)

Calculates whether a value is less than or equal to the value following this symbol.

**Usage:** `Value 1 <= Value 2`, replacing each value with merge fields, expressions, or other numerical values.

**Return Value:** Boolean

```javascript
IF(AnnualRevenue <= 1000000, 1, 2)
```

Assigns the value "1" to revenue less than or equal to a million, and the value "2" to revenue greater than a million.

### >= (Greater Than or Equal To)

Calculates whether a value is greater than or equal to the value following this symbol.

**Usage:** `Value 1 >= Value 2`, replacing each value with merge fields, expressions, or other numerical values.

**Return Value:** Boolean

```javascript
IF(Commission__c >= 1000000, "YES", "NO")
```

Assigns the value "YES" to commissions greater than or equal to a million. Note that this is a text formula field using the custom currency field Commission.

### && (AND)

Evaluates whether both of two values or expressions are true. Use this operator as an alternative to the logical function AND.

**Usage:** `Logic 1 && Logic 2`, replacing Logic 1 and Logic 2 with the values or expressions you wish to evaluate.

**Return Value:** Boolean

```javascript
IF((Price<100 && Quantity<5), "Small", null)
```

If the price is less than 100 and the quantity is less than five, this formula displays "Small". Otherwise, this field is empty.

### || (OR)

Evaluates whether at least one of multiple values or expressions is true. Use this operator as an alternative to the logical function OR.

**Usage:** `Logic 1 || Logic 2`, replacing any number of logic references with the values or expressions you wish to evaluate.

**Return Value:** Boolean

```javascript
IF(Priority = "High" || Status = "New", ROUND(NOW()-CreatedDate, 0), null)
```

If the case Status is "New" or Priority is "High", this formula returns the number of days the case has been unprocessed. If the case was opened today, the field shows zero.

```javascript
Discount_Rate__c < 0 || Discount_Rate__c > 0.40
```

When the custom field Discount Rate's value is not between 0 and 40%, this validation rule formula displays the error message: "Discount Rate cannot exceed 40%."




## Text Operators

### & (Concatenation)

Connects two or more strings.

**Usage:** `String 1 & String 2`, replacing each string with merge fields, expressions, or other values.

**Return Value:** Text

```javascript
"Expense-" & Trip_Name__c & "-" & ExpenseNum__c
```

This formula displays the text “Expense-” before the trip name and expense number. It is a text formula field using the custom field Expense Number.


## Date and Time Functions

### ADDMONTHS

Returns the date before or after a specified number of months from the given date. If the remaining month has fewer days than the start month, the function returns the last day of the remaining month. Otherwise, the result includes the same day component as the specified date.

**Usage:** `ADDMONTHS(date/datetime, number)`, replace `date/datetime` and `number` with the start date and the number of months to be added.

**Parameters:**

- *Date, Datetime:* `date/datetime` Date or datetime representing the start date.
- *Number:* `number` Numeric value representing the number of months to add.

**Return Value:** Date

```javascript
ADDMONTHS(StartDate, 5)
```

Adds 5 months to the start date. For example, if the start date is September 20, 2017, the result date is February 20, 2018; if the start date is September 30, 2017, the result date is February 28, 2018.

<alert type="info">
Supports passing date or datetime type parameters, but the return value is always a date type, not a datetime type.
</alert>

### DATE

Returns a date value from the year, month, and day values you enter. If the DATE function value in a formula field is an invalid date, it returns an error message.

**Usage:** `DATE(year, month, day)`, replace year with a four-digit year, month with a two-digit month, and day with a two-digit day.

**Parameters:**

- *Year:* `number` Four-digit year.
- *Month:* `number` Numeric value representing the month.
- *Day:* `number` Numeric value representing the day.

**Return Value:** Date

```javascript
DATE(2005, 1, 2)
```

Creates a date field for January 2, 2005.

<alert type="info">
The number of parameters must be three, and formats like `2005-01-01` are not supported.
</alert>

<alert type="info">
If the function parameters are formatted correctly but the values are not standard, it will not return an error but a possibly incorrect value, like DATE(2021, 2, 29) will return 2021-03-01, and DATE(2021, 121, 29) will return 2031-01-29.
</alert>

### DATEVALUE

Returns a date value for date, datetime, or text expressions.

**Usage:** DATEVALUE(expression)

**Parameters:** `date/datetime/text` Merge field or expression of date, datetime, or text in date/datetime format

**Return Value:** Date

```javascript
DATEVALUE(ClosedDate)
```

Displays a date value based on the ClosedDate datetime field value. The parameter ClosedDate can be a date, datetime type, or a string type in date/datetime format.

```javascript
DATEVALUE("2005-1-15 12:30")
```

Returns the date value "2005-01-15".

<alert type="info">
■ If the field referenced in this function is not a valid text or datetime field, the field in this formula might display as an abnormal string or error message, like DATEVALUE("2005-111-15") will return NaN-NaN-NaN.
■ When entering dates, please put the date in quotes and use the following format: YYYY-MM-DD, i.e., four-digit year, two-digit month, and two-digit day.
■ If the expression is not within a valid date range (for example, MM is not between 01 and 12), the field in this formula will display "NaN-NaN-NaN".
■ This formula always returns a value at 0 hours UTC time, and unless the entered parameter explicitly includes time zone information, it will always use the user's time zone to calculate, like DATEVALUE('2018-12-12 06:06:06') returns 2018-12-11, and DATEVALUE('2018-12-12T06:06:06Z') returns 2018-12-12.
</alert>

### DATETIMEVALUE

Returns the year, month, day, and GMT time value.

**Usage:** DATETIMEVALUE(expression)

**Parameters:** `text` Text value in date/datetime format without TZ character, merge field, or expression

**Return Value:** Datetime

```javascript
DATETIMEVALUE(TEXT(ClosedDate))
```

Displays a datetime value based on the ClosedDate field value, where the parameter ClosedDate must be a date type and not a datetime type, as TEXT(ClosedDate) returns a string like "2020-11-04 03:45:00Z" with a 'Z' character for datetime types.

```javascript
DATETIMEVALUE(SUBSTITUTE(TEXT(ClosedDate), "Z", ""))
```

Displays a datetime value based on the ClosedDate field value, where the parameter ClosedDate can be a date or time type, as this example removes the final 'Z' character.

```javascript
DATETIMEVALUE("2005-11-15 17:00:00")
```

Returns the date and time value "2005-11-15T17:00:00.000Z" (i.e., UTC time 17:00:00 on November 15, 2005).

### DAY

Returns a number between 1 and 31 representing the day of the month.

**Usage:** DAY(date)

**Parameters:** date Date field or value (such as TODAY())

**Return Value:** Numeric

```javascript
DAY(Code_Freeze__c)
```

Returns the day from your custom Code Freeze date. Note that this does not apply to "datetime" fields.

<alert type="info">
Only supports date type values, does not support "datetime" type values, nor string type values.
</alert>

### HOUR

Returns the hour value in 24-hour format (0~23) for the GMT time zone.

**Usage:** `HOUR(datetime)`, replace datetime with a datetime value or values like DATETIMEVALUE(), does not support string parameters.

**Parameters:** datetime Datetime field or value (such as NOW())

**Return Value:** Numeric

```javascript
HOUR(ClosedDate)
```

Displays only the hour from the datetime ClosedDate field.

```javascript
HOUR(DATETIMEVALUE('2018-12-12 18:06:08'))
```

Returns 18, not 10.

### MILLISECOND

Returns a number between 0 and 999 representing the millisecond value.

**Usage:** `MILLISECOND(datetime)`, replace datetime with a datetime value, such as NOW(), does not support date type or string parameters.

**Parameters:** datetime Datetime field or value (such as NOW())

**Return Value:** Numeric

```javascript
MILLISECOND(DATETIMEVALUE(SUBSTITUTE(TEXT(ClosedDate), "Z", "")))
```

Displays only the millisecond value from the datetime field of ClosedDate.

```javascript
MILLISECOND(NOW())
```

Returns the current time's millisecond value, such as 125.

### MINUTE

Returns a number between 0 and 60 representing the minute value.

**Usage:** `MINUTE(datetime)`, replace datetime with a datetime value, such as NOW(), does not support date type or string parameters.

**Parameters:** datetime Datetime field or value (such as NOW())

**Return Value:** Numeric

```javascript
MINUTE(DATETIMEVALUE(SUBSTITUTE(TEXT(ClosedDate), "Z", "")))
```

Displays only the minute value from the datetime field of ClosedDate.

```javascript
MINUTE(NOW())
```

Returns the current time's minute value, such as 12.

<alert type="info">
The MINUTE function only accepts datetime types as parameters, does not support time, date, or text types. Use the DATETIMEVALUE function for type conversion before calling this function.
</alert>

### MONTH

Returns the month as a number from a given date, between 1 (January) and 12 (December).

**Usage:** `MONTH(date)`, replace date with the field or expression containing the month you wish to return.

**Parameters:** date Date field or value (such as TODAY())

**Return Value:** Numeric

```javascript
MONTH(SLAExpirationDate__c)
```

Returns the month of your Service Level Agreement expiration. This example uses a custom date field named SLA Expiration Date.

```javascript
MONTH(TODAY())
```

Returns the current month in numeric format. For instance, for the month "February," it returns the value "2".

<alert type="info">
The MONTH function only accepts date types as parameters, does not support time, datetime, or text types. Use the DATEVALUE function for type conversion before calling this function.
</alert>

### NOW

Returns the current date and time.

**Usage:** `NOW()`

**Return Value:** Datetime

```javascript
IF(Status = "Open", ROUND(NOW()-CreatedDate, 0), null)
```

This formula checks whether a lead is unprocessed; if so, it calculates the number of days unprocessed by subtracting the creation date and time from the current date and time. The result is the number of unprocessed days rounded to zero decimal places. If the lead is processed, this field is empty.

<alert type="info">
■ Do not remove the parentheses.
■ Keep the parentheses empty. They should not contain values.
■ The NOW function returns a “datetime” field, not a “date” field. The Created Date and Last Modified Date are “date/time” fields, while the Last Activity Date is a “date” field.
■ If you want to use a “date” field, use the TODAY function.
■ The date and time are always calculated based on the user's timezone, and the function itself returns UTC time values, such as "2020-11-07T07:28:00Z" for Beijing time 2020-11-07 15:28.
■ Use the NOW function with other “datetime” fields and addition/subtraction operators to return a number representing days. For example, NOW() - CreatedDate calculates the number of days since a record’s creation date. In this example, the formula field data type is numeric.
■ Use the NOW function with a number to return a date and time. For example, NOW() + 5 calculates the date and time five days prior to the current time. In this example, the formula field data type is “datetime”.
</alert>

### SECOND

Returns the second value in a range from 0 to 60.

**Usage:** `SECOND(datetime)`, replace datetime with a datetime value or values like DATETIMEVALUE(), does not support date type or string parameters.

**Parameters:** datetime Datetime field or value (such as NOW())

**Return Value:** Numeric

```javascript
SECOND(ClosedDate)
```

Displays only the second value from the datetime field of ClosedDate.

```javascript
SECOND(DATETIMEVALUE('2018-12-12 18:06:08'))
```

Returns 8.

### TIMENOW

Returns the current time value (GMT). If you only want to track time and not the date, use this function instead of NOW.

**Usage:** `TIMENOW()`

**Return Value:** Time

```javascript
IF(Rating="Hot", TEXT(TIMENOW()), TEXT(TIMEVALUE(CreatedDate)))
```

This formula checks and understands if a lead is rated as "Hot"; if so, it returns the correct time. Otherwise, it returns the time since someone created the lead.

<alert type="info">
■ Do not remove the parentheses.
■ Keep the parentheses empty. They should not contain values.
■ If you want to use a “date” field, use the TODAY function.
■ The displayed value is in the GMT time zone.
■ Since Steedos does not yet support time type fields, only text values can be output with the TEXT function.
</alert>

### TIMEVALUE

Returns a local time value without a date, such as working hours.

**Usage:** `TIMEVALUE(value)`, replace value with a text value, merge field, or expression in time format.

**Parameters:** text String in time format, such as 17:30:45.125

**Return Value:** Time

```javascript
TEXT(TIMEVALUE("17:30:45.125"))
```

Returns "17:30:45.125".

<alert type="info">
■ Do not use TIMEVALUE with datetime fields.
■ Since Steedos does not yet support time type fields, only text values can be output with the TEXT function.
</alert>

### TODAY

Returns the current date as a date data type.

**Usage:** `TODAY()`

**Return Value:** Date

```javascript
TODAY()-Sample_date_c
```

Calculates how many more days are left in the sample.

```javascript
SampleDate < TODAY()
```

This example ensures users cannot change the Sample Date to a past date.

<alert type="info">
■ Do not remove the parentheses.
■ Keep the parentheses empty. They should not contain values.
■ Use the TODAY function in “date” fields, not “datetime” fields. Last Activity Date is a “date” field; Created Date and Last Modified Date are “datetime” fields.
■ If you want to use a datetime field, refer to the NOW function.
■ The date is always calculated based on the user's timezone, and TODAY() returns the value of 0 hours GMT for that day.
■ Use the TODAY function with other “date” fields and addition/subtraction operators to return a number representing days. For example, TODAY()-LastActivityDate calculates the number of days since the last activity date. In this example, the formula field data type is numeric.
■ Use the TODAY function with a number to return a date. For example, TODAY() +5 calculates the date five days before today. In this example, the formula field data type is a date.
</alert>

### WEEKDAY

Returns the day of the week for a specified date, with 1 representing Sunday, 2 representing Monday, and so on up to 7 for Saturday.

**Usage:** `WEEKDAY(date)`

**Parameters:** date Date field or value (such as TODAY())

**Return Value:** Numeric

```yaml
WEEKDAY(customdate1__c)
```

Returns the day of the week for a specified date using customdate1__c.

<alert type="info">
■ This function only supports date type values, not datetime or string type values as parameters.
■ This function differs from the JavaScript programming language's Date.getDay function, which uses 0 for Sunday, 1 for Monday, and so on up to 6 for Saturday.
</alert>

### YEAR

Returns the year in numeric format as a four-digit number for a given date.

**Usage:** `YEAR(date)`, replace date with the field or expression containing the year you wish to return.

**Parameters:** date Date field or value (such as TODAY())

**Return Value:** Numeric

```yaml
YEAR(TODAY()) - YEAR(Initial_Meeting__c)
```

Returns the number of years since your initial meeting with a client. This example uses a custom date field named Initial Meeting.

<alert type="info">
■ This function only supports date type values, not datetime or string type values as parameters.
■ This function is consistent with the JavaScript programming language's Date.getYear function.
</alert>


## Logical Functions

### AND

Returns TRUE if all values are true, and FALSE if one or more values are false. This function is an alternative to the && (AND) operator.

**Usage:** AND(logical1, logical2...)

**Parameters:**

* *Logical Expression 1:* `boolean` The first formula expression you want to evaluate that returns a Boolean value.
* *Logical Expression 2:* `boolean` The second formula expression you want to evaluate that returns a Boolean value.
* ... Additional expressions that return Boolean values.

**Return Value:** Boolean

```javascript
IF(AND(Price<1,Quantity<1),"Small", null)
```

This formula displays "Small" if both price and quantity are less than 1. If either the price or quantity of an asset is greater than 1, this field is empty.

### BLANKVALUE

Determines if an expression has a value and returns a substitute expression if it does not. If the expression has a value, it returns the value of the expression.

**Usage:** BLANKVALUE(expression, substitute expression)

**Parameters:**

* *Expression:* `text/number/date/datetime` The expression you want to evaluate, supports common field types except Boolean.
* *Substitute Expression:* `text/number/date/datetime` The value you wish to replace any blank values with, should be the same data type as the first parameter, otherwise, it returns an error.

**Return Value:** The same data type as the passed parameters

```yaml
BLANKVALUE(Department, "Undesignated")
```

If the department field contains a value, this formula returns the value of the department field. If the department field is empty, this formula returns "Undesignated."

```yaml
BLANKVALUE(Payment_Due_Date__c, StartDate + 5)
```

This formula returns the date five days after the start date of the contract when Payment Due Date is empty. Payment Due Date is a custom date field.

> * If a field contains characters, white space, or zero, then the field is not empty. For example, if a field contains a space inserted with the space bar, then the field is not empty.
> * If a field has no value, the BLANKVALUE function returns the value of the specified substitute expression; if you just want to check if a field has a value, use the ISBLANK function.
> * The two parameters passed must be of the same data type, otherwise, the formula will return an error directly.
> * The parameters do not support Boolean values.
> * The parameters do not support select field types.
> * If you judge a numeric field for a blank value, such as `BLANKVALUE(Amount, 100)`, the formula only returns the value of the specified substitute expression if the field has no value and is configured to treat blank fields as blank. If the field has no value and is configured to treat blank fields as 0, it returns 0 instead of the specified substitute expression value.
> * Since our default blank field handling method is "treat blank fields as zero," be careful in low-code, if you do not configure this attribute, the default is to treat it as 0 value. In zero-code configuration, there is no problem because the blank field handling attribute is mandatory and there is no default value problem.

<alert type="info">
■ This function is similar to ISBLANK, but it further returns the value of the substitute expression when the field value is empty. Generally, if you just want to determine if the field value is empty, you should use the latter instead of this function.

■ This function does not support select field type parameters, but if the field is single-select, you can first convert the select type to text type with the TEXT function, such as `BLANKVALUE(TEXT(Leave__c), "error")`. The multi-select select field type cannot use the BLANKVALUE function.
</alert>

<alert type="info">
* Field type `text`: `BLANKVALUE(FieldName, "Replacement Value")`
* Field type `select`: `IF(ISBLANK(FieldName), Replacement Value, FieldName)`
* Field type `number/currency`: `BLANKVALUE(FieldName, "Replacement Value")`
* Field type `date/datetime`: `BLANKVALUE(FieldName, "Replacement Value")`
* Field type `lookup/master_detail`: `BLANKVALUE(FieldName._id, "Replacement ID Value")`
* Field type `boolean`: `IF(FieldName, ValueA, ValueB)`
</alert>

### CASE

Checks a given expression against a series of values. If the expression equals one of the values, it returns the corresponding result. If it does not equal any of the values, it returns an alternate result.

**Usage:** CASE(expression, value1, result1, value2, result2, ..., other result), replace the expression with the field or value you want to compare to each specified value. Each value and result must be replaced with equal values to return a result item. Replace other result with the value you wish to return when the expression does not equal any of the values.

**Parameters:**

* *Expression:* `text/number/currency/percent/date/datetime/select` The field or value to compare against each specified value.
* *Value1:* `text/number/currency/percent/date/datetime` The first value to compare against the first parameter value.
* *Result1:* `text/number/currency/percent/date/datetime` The result value returned when the first parameter value equals the "Value1" parameter.
* *Value2:* `text/number/currency/percent/date/datetime` The second value to compare against the first parameter value.
* *Result2:* `text/number/currency/percent/date/datetime` The result value returned when the second parameter value equals the "Value2" parameter.
* ...
* *Other Result:* `text/number/currency/percent/date/datetime` The result value returned when the expression does not equal any of the previous parameter values.

**Return Value:** The same data type as the last parameter

***Formula Field Examples:***

***1. Days Case Unhandled***

This is an example of a custom formula field, Days Open, that displays different text based on the number of days a case has been unhandled:

```javascript
CASE(Days_Open__c, 3, "Reassign", 2, "Assign Task", "Maintain")
```

Displays the following text:

* "Reassign" for any case unhandled for three days.
* "Assign Task" for any case unhandled for two days.
* "Maintain" for all other cases.

***2. Month of Last Activity***

This formula field displays the month of the last activity or "None" if there is no activity:

```yaml
CASE(MONTH(LastActivityDate),
1, "January",
2, "February",
3, "March",
4, "April",
5, "May",
6, "June",
7, "July",
8, "August",
9, "September",
10, "October",
11, "November",
12, "December",
"None")
```

***Default Value Examples:***

***1. Discount Rate***

Use the following default value formula to insert a different discount rate in an opportunity based on the department of the person who created the opportunity:

```yaml
CASE(User.Department, "IT", 0.25, "Field", 0.15, 0)
```

In this example, the formula inserts a 25% discount rate for all opportunities created by users in the "IT" department, or a 15% discount rate for all opportunities created by personnel in the "Field" department. If the creator does not belong to either of these departments, the discount rate is zero. This is a custom percentage field in the opportunity using the standard user field Department.

***2. Product Language***

You might want to associate products with their language so users know what type of documentation or adapters to include. Use the following default value formula to automatically set the language of a product based on the country of the user who created it. In this example, if the user's country is "Japan," the default value is "Japanese"; if the user's country is "US," the default value is "English." If neither, the default value "unknown" is inserted into the product language field.

```yaml
CASE($User.Country, "Japan", "Japanese", "US", "English", "unknown")
```

<alert type="info">
■ Ensure your `value1`, `value2`, etc., expressions are of the same data type and must match the data type of the first parameter value.

■ Ensure your `result1`, `result2`, etc., expressions, and the final `other result` expression are of the same data type, but they do not need to match the data type of the first parameter value, and they often do not.

■ The CASE function cannot include parameters that return a Boolean type, i.e., true or false. Instead, ensure true or false expressions return a supported data type, for example:

`CASE(1, IF(ISPICKVAL(Term__c,"12"), 1, 0), 12 * Monthly_Commit__c, IF(ISPICKVAL(Term__c,"24"), 1, 0), 24 * Monthly_Commit__c, 0)`

In this formula, Term is a picklist field, and when it contains the value 1, representing true, it multiplies with "Monthly Commit."

■ Include an other result value.

■ If any expression returns an error, the `CASE` function will also return an error, even if other expressions return correct values. For example, in `CASE(Field__c, "Partner", "P", "Customer", "C", LEFT(Field__c, -5))`, even if the field's value is "Partner" or "Customer," the formula will return an error due to the illogical last statement.

■ If the field in the CASE function is empty, it returns the other result value. For example, if the Days Open field is empty, 0, or any value other than 2 and 3, `CASE(Days_Open__c, 3, "Reassign", 2, "Assign Task", "Maintain")` will display "Maintain."

■ Use the CASE function to determine if a picklist value equals a specific value. For example, when Term is 12, `CASE(Term__c, "12", 12 * Monthly_Commit__c, "24", 24 * Monthly_Commit__c, 0)` multiplies Monthly Commit by 12; when Term is 24, it multiplies by 24. Otherwise, the result is zero.

</alert>

<alert type="info">
* No parameter in the CASE function supports Boolean values. This means not only the first parameter and subsequent comparison values cannot be Boolean, but also the last parameter cannot be Boolean, meaning the entire function's return value cannot be a Boolean.
* The expression parameter, i.e., the first parameter, supports select fields, but only single-select. Passing a multi-select select will result in an error.

</alert>

### IF

Determines if an expression is true or false. If true, it returns a given value; if false, it returns another value.

**Usage:** IF(logical test, value_if_true, value_if_false)

**Parameters:**

* *Logical Expression:* `boolean` A logical expression that ultimately returns a Boolean value.
* *Value_if_true:* `text/number/currency/percent/date/datetime` The value you wish to return when the expression is true, supports common field types except Boolean.
* *Value_if_false:* `text/number/currency/percent/date/datetime` The value you wish to return when the expression is false, supports common field types except Boolean.

**Return Value:** The same data type as the first and second parameters

***Formula Field Examples:***

***1. Payment Overdue***

```javascript
IF(AND(Payment_Due_Date__c < TODAY(), Payment_Status__c = "UNPAID"), "PAYMENT OVERDUE", null)
```

This formula determines whether the payment due date has passed and whether the payment status is "UNPAID." If so, it returns the text "PAYMENT OVERDUE"; otherwise, it keeps the field empty. This example uses a custom date field named Payment Due Date and a custom text field named Payment Status.

***2. Inserting Tax Rate***

Use this default value formula to set the tax rate of an asset based on the city of the user. Create a custom percentage field using the following default value:

```yaml
IF($user.city = "Napa", 0.0750, IF($user.city = "Paso Robles", 0.0725, IF($user.city = "Sutter Creek", 0.0725, IF($user.city = "Los Olivos", 0.0750, IF($user.city = "Livermore", 0.0875, null )))))
```

<alert type="info">
* Ensure that your value_if_true and value_if_false expressions are of the same data type and are not Boolean values.
* The IF function does not support Boolean values as return values, i.e., the second and third parameters cannot be Boolean.

</alert>

### ISBLANK

Determines whether an expression has a value, returning TRUE if it does not. If it contains a value, the function returns FALSE.

**Usage:** ISBLANK(expression)

**Parameters:** `text/number/date/datetime/select` The expression you want to evaluate.

**Return Value:** Boolean

```yaml
((IF(ISBLANK(Maint_Amount__c), 0, 1) + IF(ISBLANK(Services_Amount__c), 0, 1) + IF(ISBLANK(Discount_Percent__c), 0, 1) + IF(ISBLANK(Amount), 0, 1) + IF(ISBLANK(Timeline__c), 0, 1)) / 5
```

This formula extracts a set of fields and calculates the percentage used by the personnel. It checks five fields to see if they are empty. If empty, that field counts as 0. For any field containing a value, it counts "1," and the total is divided by five (the number of fields calculated). This formula requires selecting the "treat blank fields as blank" option under "blank field handling," otherwise ISBLANK will always return FALSE.

<alert type="info">
■ Do not use expressions like `MyDateTime__c == null` to determine blank values; use `ISBLANK(MyDateTime__c)` instead.

■ If a field contains characters, white space, or zero, it is not empty. For example, if a field contains a space inserted with the space bar, then the field is not empty.

■ If a field has no value, use the BLANKVALUE function to return the specified expression; if you just want to check if a field has a value, use the ISBLANK function.

■ If you use this function on a numeric field, like `ISBLANK(Amount)`, the function returns TRUE only if the field has no value and is configured to treat blank fields as blank.

■ Since our default blank field handling method is "treat blank fields as zero," be careful in low-code, as by default, it is treated as 0 value. In zero-code configuration, there is no problem as the blank field handling attribute is mandatory and has no default value.

■ For select field types, the syntax for single and multi-select is the same, just pass the parameter value directly.

</alert>

<alert type="info">
ISBLANK function returns a Boolean value but does not support parameters that are themselves Boolean values.

</alert>

<alert type="info">
* Field type `text/select`: `ISBLANK(FieldName)`.
* Field type `number/currency`: `ISBLANK(FieldName)`, but only effective when configured to treat blank fields as blank, otherwise always returns false.
* Field type `date/datetime`: `ISBLANK(FieldName)`.
* Field type `lookup/master_detail`: `ISBLANK(FieldName._id)`.
* Field type `boolean`: `FieldName`.

</alert>

### NOT

Returns FALSE for TRUE, and TRUE for FALSE.

**Usage:** NOT(logical expression)

**Parameters:** `boolean` The expression you want to evaluate.

```javascript
IF(NOT(Status = "Closed"), ROUND(NOW()-CreatedDate, 0), null)
```

Checks if the variable is unhandled; if so, it calculates the number of days it has been unhandled by subtracting the creation date and time from the current date and time. The result is the number of unhandled days rounded to zero decimal places. If the variable is handled, this field is empty.

### OR

Returns TRUE if any expression is true. If all expressions are false, it returns FALSE. This function is an alternative to the || (OR) operator.

**Usage:** OR(logical1, logical2...)

**Parameters:**

* *Logical Expression 1:* `boolean` The first formula expression you want to evaluate that returns a Boolean value.
* *Logical Expression 2:* `boolean` The second formula expression you want to evaluate that returns a Boolean value.
* ... Additional expressions that return Boolean values.

**Return Value:** Boolean

```javascript
IF(OR(Priority="High", Status="New"), ROUND(NOW()-CreatedDate, 0), null)
```

If the case's Status is "New" or the Priority is "High," this formula returns the number of days the case has been unhandled. If the case was opened today, the field shows zero.


## Mathematical Functions

### ABS

Calculates the absolute value of a number. The absolute value of a number is the number without its sign.

**Usage:** ABS(number)

**Parameter:** `number` A merge field, expression, or other value from which you wish to remove the sign.

**Return Value:** Numeric

```javascript
ABS(ExpectedRevenue)
```

Calculates the positive value of the Expected Revenue amount, regardless of whether it is positive or negative.

### CEILING

Rounds a number up to the nearest integer; for negative numbers, it first rounds the positive part to the nearest integer and then adds the negative sign prefix.

**Usage:** CEILING(number)

**Parameter:** `number` The field or expression you wish to round.

**Return Value:** Numeric

```javascript
CEILING(2.3)
```

Returns 3, as 2.3 is rounded up to the nearest integer.

```javascript
CEILING(-2.3)
```

Returns -3, as -2.3 is rounded up to the nearest positive integer below zero and then given a negative sign.

### EXP

Returns a value equal to the power of e raised to the specified number.

**Usage:** EXP(number)

**Parameter:** `number` A numeric field or value (like 5).

**Return Value:** Numeric

```javascript
EXP(3)
```

This formula returns a value equal to e raised to the power of three.

```javascript
Principal__c  EXP(Rate__c  Years__c)
```

This formula calculates compound interest based on a custom currency field for principal, a custom percentage field for rate, and a custom numeric field for years.

### FLOOR

Returns a number rounded down to the nearest integer; for negative numbers, it rounds the integer part down and then adds the negative sign.

**Usage:** FLOOR(number)

**Parameter:** `number` A numeric field or value (like 5.245).

**Return Value:** Numeric

```javascript
FLOOR(2.5)
```

Returns 2, as 2.5 is rounded down to the nearest integer.

```javascript
FLOOR(-2.5)
```

Returns -2, as -2.5 is rounded down to the nearest negative number above zero.

### LN

Returns the natural logarithm of a specified value. The natural logarithm is based on the constant e (value 2.71828182845904).

**Usage:** LN(number)

**Parameter:** `number` The field or expression whose natural logarithm you wish to obtain. Note: The LN function is the inverse of the EXP function.

**Return Value:** Numeric

```javascript
LN(10)
```

Returns the natural logarithm of 10, which is approximately 2.30.

```javascript
LN(Value__c)
```

Returns the natural logarithm of a custom numeric field named Value.

### LOG

Returns the base 10 logarithm of a number.

**Usage:** LOG(number)

**Parameter:** `number` The field or expression from which you want to calculate the base 10 logarithm.

**Return Value:** Numeric

```javascript
LOG(Salary__c)
```

Calculates the logarithm of someone's salary.

In this example, Salary is a custom currency field.

### MAX

Returns the largest number in a series of numbers.

**Usage:** MAX(number, number, ...)

**Parameters:**

* *Number:* `number` One of the fields or expressions from which you wish to retrieve the largest number.
* *Number:* `number` Another field or expression from which you wish to retrieve the largest number.
* ... More fields or expressions from which you wish to retrieve the largest number.

**Return Value:** Numeric

***Examples:***

***1. Service Fee***

```javascript
MAX(0.06 * Total_Cost__c , Min_Service_Charge__c)
```

***2. Book Royalties***

This example of a formula field calculates a service fee, taking the greater of 6% of the total cost or a minimum service charge. Note that the minimum service charge is a custom currency field with a default value of $15. However, if the minimum service charge is not always the same amount, you could make that field a formula field.

```javascript
MAX(0.10 * Pages__c, (Retail_Price__c * 0.07) * Total_Sold__c)
```

***3. Commission***

This formula determines the royalties to be paid on a book. It shows the larger of two amounts: $0.07 per book sold or $0.10 per page. It assumes you have custom numeric fields named Pages and Total Sold and a custom currency field named Retail Price.

```javascript
MAX($user.Commission_Percent__c * Price, Price * Account_Discount__c, 100)
```

This example determines the commission for an asset record based on the larger of the user's price commission percentage, the price times the discount percentage stored as an amount, or $100. This example assumes you have two custom percentage fields for the user and the asset.

### MCEILING

Rounds a number up to the nearest integer; for negative numbers, it rounds up to the nearest negative integer based on value size.

**Usage:** MCEILING(number)

**Parameter:** `number` The field or expression you wish to calculate.

**Return Value:** Numeric

```javascript
MCEILING(2.3)
```

Returns 3, as 2.3 is rounded up to the nearest integer.

```javascript
MCEILING(-2.3)
```

Returns -3, as for negative numbers, -2.3 is rounded down to the nearest negative integer.

> The MCEILING function is similar to CEILING when the input parameter is a positive number, but differs for negative numbers as the latter first rounds up the positive value before adding the negative sign prefix.

### MFLOOR

Rounds a number down to the nearest integer; for negative numbers, it rounds down to the nearest negative integer based on value size.

**Usage:** MFLOOR(number)

**Parameter:** `number` The field or expression you wish to calculate.

**Return Value:** Numeric

```javascript
MFLOOR(2.3)
```

Returns 2, as 2.3 is rounded down to the nearest integer.

```javascript
MFLOOR(-2.3)
```

Returns -3, as for negative numbers, -2.3 is rounded down to the nearest negative integer.

> The MFLOOR function is similar to FLOOR when the input parameter is a positive number, but differs for negative numbers as the latter first rounds down the positive value before adding the negative sign prefix.

### MIN

Returns the smallest number in a series of numbers.

**Usage:** MIN(number, number, ...)

**Parameters:**

* *Number:* `number` One of the fields or expressions from which you wish to retrieve the smallest number.
* *Number:* `number` Another field or expression from which you wish to retrieve the smallest number.
* ... More fields or expressions from which you wish to retrieve the smallest number.

**Return Value:** Numeric

```javascript
MIN(250, Contribution__c /2)
```

In this example, the formula determines the amount to contribute in an employee 401K match based on half of the employee's contribution or $250, whichever is less. It assumes you have a custom currency field named Contribution.

```javascript
MIN(Gross__c * Bonus_Percent__c, ​ Performance__c / Number_of_Employees__c)
```

This example determines the employee bonus amount based on the lesser of two amounts: the employee's total times the bonus percentage or the company's performance bonus amount divided among all employees. It also assumes you have a custom numeric field named Number of Employees, a custom percentage field named Bonus Percent, and custom currency fields for the employee's Gross and the company's Performance.

### MOD

Returns the remainder of a number divided by a specified divisor.

**Usage:** MOD(number, divisor)

**Parameters:**

* *Number:* `number` The field or expression you wish to divide.
* *Divisor:* `number` The number to be used as a divisor.

**Return Value:** Numeric

```javascript
MOD(3, 3)MOD(4, 3)MOD(123, 100)
```

Returns 0; returns 1; returns 23.

You might want to prevent users from scheduling meetings on Saturdays or Sundays. Apply this validation rule example to a custom date field named My Date.

```yaml
CASE(MOD(My_Date__c - DATE(1900, 1, 7), 7),
0, 0,
6, 0,
1) = 0
```

When the value of My Date is not within the range of Monday to Friday, this example returns the error message: "My Date is not a weekday."

> Do not use a value of 0 as a divisor.

### ROUND

Returns a number closest to the specified number, constrained by the specified number of digits.

**Usage:** ROUND(number, decimal places)

**Parameters:**

* *Number:* `number` The field or expression you wish to round.
* *Decimal Places:* `number` The number of decimal places you wish to consider when rounding.

**Return Value:** Numeric

```javascript
ROUND (1.5, 0) = 2ROUND (1.2345, 0) = 1ROUND (-1.5, 0) = -2ROUND (225.49823, 2) = 225.50
```


```javascript
ROUND( Amount-Amount* Discount_Percent__c,2)
```

This formula can be used to calculate the discounted amount of a business opportunity, rounded to two decimal places. This example is a numeric formula field for a business opportunity, using a custom percentage field named Discount Percent.

> ■ Enter zero for the number of digits to round the value to the nearest integer.
>
> ■ The function automatically rounds the number according to the decimal places you specify. For example, when you enter 1.49999, a custom numeric field set for two decimal places stores it as 1.50.
>
> ■ The function uses a rounding algorithm where half values always round up to the next digit. For example, 1.45 rounds up to 1.5. –1.45 rounds up to –1.5.
>
> ■ The displayed number on the interface depends on the decimal places selected when defining the field. Here, the number of digits refers to the number of decimal places considered during formula calculation rounding.
>
> ■ If the first parameter value is negative, it will round the positive part and then add the negative sign prefix as the final return value, rather than rounding the value as the JavaScript programming language's Math.round function does.

### SQRT

Returns the positive square root of a given number.

**Usage:** SQRT(number)

**Parameter:** `number` The field or expression whose square root you wish to calculate.

**Return Value:** Numeric

```javascript
SQRT(25)
```

Returns the square root of 25 (which is 5).

```javascript
SQRT(Amplitude__c)
```

Returns the square root of a custom numeric field representing the amplitude of an earthquake.

> ■ Calculating the square root of a negative number is not supported and will return an error message.
>
> ■ You can avoid division by zero by including the IF function, for example: IF( Amplitude__c >= 0, SQRT( Amplitude__c ), null).


## Text Functions

### BEGINS

Determines if text begins with specific characters, returning TRUE if it does. Otherwise, it returns FALSE.

**Usage:** BEGINS(text, compare_text)

**Parameters:**

* *text:* `text` The full text or field you want to compare.
* *compare_text:* `text` The text fragment for comparison.

**Return Value:** Boolean

```yaml
IF(BEGINS(Product_type__c, "ICU"), "Medical", "Technical")
```

If the custom text field Product_type begins with "ICU", this example returns "Medical". For all other products, it returns "Technical".



<alert type="info">
■ This function is case-sensitive, so ensure the compare_text value's casing is correct.

■ When used in validation or workflow rules, empty fields are considered valid. For instance, if your validation rule tests if an asset's serial number begins with "3", all assets with an empty serial number are considered valid.

</alert>

### BR

Inserts a line break in a text string.

**Usage:** BR()

**Return Value:** Text

```yaml
CASE(ShippingCountry, "USA", ShippingStreet & BR() & ShippingCity & ", " & ShippingState & " " & ShippingPostalCode & BR() & ShippingCountry, "France", ShippingStreet & BR() & ShippingPostalCode & " " & ShippingCity & BR() & ShippingCountry, "etc")
```

This formula field displays a formatted mailing address for contacts, potentially including spaces and line breaks at appropriate places, depending on the country/region.



<alert type="info">
■ Do not remove the parentheses following the function name.

■ Keep the parentheses empty. They should not contain any values.

■ Do not forget to add concatenation operators: & on either side of BR().

</alert>

### CASESAFEID

Converts a 15-character ID to a case-sensitive 18-character ID.

**Usage:** CASESAFEID(id)

**Parameter:** `text` The object ID.

**Return Value:** Text

```javascript
CASESAFEID(Id)
```

This formula replaces a 15-character ID with an 18-character, case-sensitive ID. Assuming the Id value is abcdefghijklmno, the formula returns "abcdefghijklmnoAAA".

### CONTAINS

Compares two text parameters, returning TRUE if the first contains the second. Otherwise, it returns FALSE.

**Usage:** CONTAINS(text, compare_text)

**Parameters:**

* *text:* `text` The original full text.
* *compare_text:* `text` The text fragment for comparison.

**Return Value:** Boolean

```javascript
IF(CONTAINS(Product_Type__c, "part"), "Parts", "Service")
```

This formula checks the contents of the custom text field Product_Type and returns "Parts" for any product containing the word "part". Otherwise, it returns "Service". Note that if the Product_Type field contains "Part" or "PART", this formula will return "Services".



<alert type="info">
■ This function is case-sensitive, so ensure the compare_text value's casing is correct.

■ When used in validation or workflow rules, empty fields are considered valid. For instance, if your validation rule tests if an asset's serial number contains "A", all assets with an empty serial number are considered valid.

■ The CONTAINS function does not support multi-select picklists.

</alert>

### FIND

Returns the position of a specified string within a text string, represented as a number.

**Usage:** FIND(search_text, text[, start_num])

**Parameters:**

* *search_text:* `text` The string to find.
* *text:* `text` The field or expression to search.
* *start_num:* `number` The character number from the left to start the search.

**Return Value:** Numeric

```javascript
FIND(" ", Street)
```

Returns the position of the first space in the Street field. This number can be used to determine the length of a street address, so that you can separate the street address from the street name in an address field.

```javascript
SUBSTITUTE(Email, LEFT(Email, FIND("@", Email)), "www.")
```

Finds the position of the @ symbol in a personal email address to determine the length of text to replace with “www.”, thereby deriving its web address.



<alert type="info">
■ Ensure to remove the brackets, [ and ], before the validation formula.

■ If the text parameter references an empty field, the formula field displays “0”.

■ Your search_text parameter is case-sensitive and cannot include any wildcards.

■ If no result is returned after the search, the field will display “0”.

■ The start_num parameter is optional. If no start_num value is entered, the formula uses the value 1 or the first character in the string.

■ If the start_num is not greater than zero, the field will display “0”.

■ If the start_num is greater than the length of the text, the field will display “0”.

■ Remember that some fields, like URL fields, are unique because the system automatically appends “http://” to the beginning of your entered text.

■ Note that the first character in the string is specified as 1 (not 0).

</alert>

### HYPERLINK

Creates a link from specified text to a specified URL that is clickable.

**Usage:** HYPERLINK(url, friendly_name [,target])

**Parameters:**

**Return Value:** Text

* *url:* `text` The URL.
* *friendly_name:* `text` The link text.
* *target:* `text` The window or frame in which to display the content.

```javascript
HYPERLINK("/00U/e?retURL=%2F006x0000001T8Om&what_id=" & Id, "Create Event")
```

Adds a link named "Create Event", which, when clicked, creates a new event associated with the current target.

```javascript
HYPERLINK("http://servername/call?id=" & Id & "&phone=" & Phone, Phone)
```

Creates a clickable phone number field that, when clicked, automatically dials the number. In this example, replace "servername" and "call" with your dialing tool name and its dialing command. Insert the identifier of the contact, opportunity, or customer record in the merge field Id. The first Phone merge field informs the dialing tool of the number to dial, and the last Phone merge field uses the value of the Phone field as the clickable text for dialing.



<alert type="info">
■ Hyperlink formula fields are of the text type.

■ Include protocols and URLs in quotation marks, like in `HYPERLINK("http://www.cnet.com", "cnet")`.

■ Avoid using text functions like LEN, LEFT, or RIGHT in the results of the HYPERLINK function.

■ URLs should not contain JavaScript for increased security of your organization.

■ Use relative links to link to in-site pages. If your full link is `https://yourInstance.steedos.com/a/b`, the relative link is "/a/b". Relative links ensure that hyperlinks work on all in-site pages. Be sure to add a forward slash "/" before the relative URL.

■ If the start_num is not greater than zero, the field will display “0”.

■ If the start_num is greater than the length of the text, the field will display “0”.

■ Remember that some fields, like URL fields, are unique because the system automatically appends “http://” to the beginning of your entered text.

■ Steedos currently does not support displaying the return value of this function as a link on the interface.

</alert>

### INCLUDES

Determines if any values selected in a multi-select picklist field are equal to the specified text literal.

**Usage:** INCLUDES(multiselect_picklist_field, text_literal)

**Parameters:**

* *multiselect_picklist_field:* `select` The name of the picklist field.
* *text_literal:* `text` The text to use for comparison.

**Return Value:** Boolean

***Example:***

```javascript
INCLUDES(Hobbies__c, "Golf")
```

If one of the values selected in the Hobbies custom multi-select picklist field is "Golf", INCLUDES(Hobbies__c, "Golf") returns TRUE.



<alert type="info">
■ This function only supports multi-select picklist fields. To use a single-select picklist field, use ISPICKVAL.

■ ISBLANK can be used to determine if a picklist field is empty.


</alert>

### ISPICKVAL

Determines if a picklist field's value is equal to the specified text literal.

**Usage:** ISPICKVAL(picklist_field, text_literal)

**Parameters:**

* *picklist_field:* `select` The name of the picklist field.
* *text_literal:* `text` The text to use for comparison.

**Return Value:** Boolean

***Examples:***

***1. Contract Activation***

```javascript
IF(ISPICKVAL(Status, "Activated"), NOW()-ActivatedDate, null)
```

Calculates the number of days since a contract was activated. If the contract status is not "Activated", this field is empty.

***2. Commission Amount***

```javascript
IF(ISPICKVAL(StageName, "Closed Won"), ROUND(Amount * 0.02, 2), 0)
```

This example calculates the commission amount for any opportunity at the "Closed Won" stage. The value of this field will be 0.02 times the amount of any won opportunities. For opportunities that are either open or lost, the commission value is zero.


## Text Functions

### BEGINS

Determines whether text begins with specific characters, returning TRUE if it does. Otherwise, returns FALSE.

**Usage:** BEGINS(text, compare_text)

**Parameters:**

* *text:* `text` The full text or field you want to compare.
* *compare_text:* `text` The text fragment for comparison.

**Return Value:** Boolean

```yaml
IF(BEGINS(Product_type__c, "ICU"), "Medical", "Technical")
```

If the custom text field Product_type begins with "ICU", this example returns "Medical". For all other products, it returns "Technical".



<alert type="info">
■ This function is case-sensitive, so ensure the compare_text value's casing is correct.

■ When used in validation or workflow rules, empty fields are considered valid. For instance, if your validation rule tests if an asset's serial number begins with "3", all assets with an empty serial number are considered valid.

</alert>

### LEFT

Returns a specified number of characters from the beginning of a text string.

**Usage:** LEFT(text, num_chars)

**Parameters:**

* *text:* `text` The field or expression you want to return.
* *num_chars:* `number` The number of characters you want to return from the left side.

**Return Value:** Text

```javascript
TRIM(LEFT(LastName, 5)) & "-" & TRIM(RIGHT(SSN__c, 4))
```

This formula displays the first five characters of the name and the last four characters of the social security number (separated by a hyphen). Note that this example uses a custom text field named SSN.



<alert type="info">
If the num_chars value is less than zero, the formula will replace it with zero.

</alert>

### LEN

Returns the number of characters in a specified text string.

**Usage:** LEN(text)

**Parameters:** `text` The field or expression whose length you want to return.

**Return Value:** Numeric

```javascript
LEN(PartNumber__c)
```

This formula returns the number of characters in the Product Code field.

### LOWER

Converts all letters in a specified text string to lowercase. Any character that is not a letter is not affected. Regional rules are applied if provided.

**Usage:** LOWER(text)

**Parameters:** `text` The field or text you want to convert to lowercase.

**Return Value:** Text

```javascript
LOWER("MYCOMPANY.COM")
```

Returns "mycompany.com."

```javascript
LOWER(TickerSymbol)
```

Returns the text in Ticker Symbol in lowercase characters.

### LPAD

Inserts specified characters on the left side of a text string.

**Usage:** LPAD(text, padded_length, pad_string)

**Parameters:**

* *text:* `text` The text is the field or expression into which you want to insert characters on the left.
* *padded_length:* `number` Padded length is the total number of characters to return in the text.
* *pad_string:* `text` Pad string is the character(s) to be inserted. Pad string is required; you can pass an empty string to indicate no padding.

**Return Value:** Text

***Examples:***

***1. Field Name: Truncated***

If the length of the value in the text exceeds the pad string, then the text is truncated to the size of the pad length.

```javascript
LPAD(Name, 20, "")
```

Truncates the Name field after 20 characters. For instance, if the initial value is "mycompany.com", the returned value is "mycompany.com"; if the initial value is "mycompany_is_good_in_china.com", the returned value is "mycompany_is_good_in".

***2. My_Company: No Change***

```javascript
LPAD('my_company.com', 14, 'z')
```

Returns "my_company.com" without any change, as it contains 14 characters.

***3. Field Name with Z Padding***

```javascript
LPAD("my_company.com", 15, "z")
```

Returns the name "zmy_company.com".



<alert type="info">
Leading spaces are not ignored.

</alert>

### MID

Returns a specified number of characters from the middle of a text string, starting at the position you specify.

**Usage:** MID(text, start_num, num_chars)

**Parameters:**

* *text:* `text` The field or expression to use when returning characters.
* *start_num:* `number` The number of characters from the left to start the return (as the starting position of characters).
* *num_chars:* `number` The total number of characters to return.

**Return Value:** Text

```javascript
MID(Division, 3, 4)
```

Returns four characters starting from the third character on the left in the Division name. For user records, this represents a department code.

```javascript
MID("ABCDEFGH", 3, 4)
```

Returns "CDEF".

```javascript
MID("ABCDEFGH", 0, 10)
```

Returns "H", indicating the start position is from 0 instead of 1. Passing a value of 0 as the starting position will not return values as expected.



<alert type="info">
Note that the first character in the text is specified as 1 (not 0).

</alert>

### RIGHT

Returns a specified number of characters from the right side of a text string.

**Usage:** RIGHT(text, num_chars)

**Parameters:**

* *text:* `text` The field or expression you want to return.
* *num_chars:* `number` The number of characters you want to return from the right side.

**Return Value:** Text

```javascript
TRIM(LEFT(LastName, 5)) & "-" & TRIM(RIGHT(SSN__c, 4))
```

Displays the first five characters of the last name and the last four characters of the social security number (separated by a hyphen). Note that this example assumes you have a text custom field named SSN.



<alert type="info">
If the num_chars value is less than zero, the formula will replace it with zero.

</alert>

### RPAD

Inserts specified characters on the right side of a text string.

**Usage:** RPAD(text, padded_length, pad_string)

**Parameters:**

* *text:* `text` The text is the field or expression into which you want to insert characters on the right.
* *padded_length:* `number` Padded length is the total number of characters to return in the text.
* *pad_string:* `number` Pad string is the character(s) to be inserted. Pad string is required; you can pass an empty string to indicate no padding. If the length of the value in the text exceeds the pad string, then the text is truncated to the size of the pad length.

**Return Value:** Text

***Examples:***

***1. Field Name: Truncated***

```javascript
RPAD(Name, 20, "")
```

Truncates the Name field after 20 characters. For instance, if the initial value is "mycompany.com", the returned value is "mycompany.com"; if the initial value is "mycompany_is_good_in_china.com", the returned value is "mycompany_is_good_in".

***2. My_Company: No Change***

```javascript
RPAD('my_company.com', 14, 'z')
```

Returns “my_company.com” without any change, as it contains 14 characters.

***3. Field Name with Z Padding***

```javascript
RPAD("my_company.com", 15, "z")
```

Returns the name "my_company.comz".



<alert type="info">
■ Trailing spaces are not ignored.

■ Truncation of characters occurs from the right side, preserving the left portion, similar to the LPAD function.

</alert>

### SUBSTITUTE

Replaces old text with new text in a text string.

**Usage:** SUBSTITUTE(text, old_text, new_text)

**Parameters:**

* *text:* `text` The field or value in which you want to replace values.
* *old_text:* `text` The text to be replaced.
* *new_text:* `text` The text to replace the old text with.

**Return Value:** Text

```javascript
SUBSTITUTE(Name, "Coupon", "Discount")
```

Returns the name of an opportunity containing the term "Coupon", replacing "Coupon" in the name with "Discount".

```javascript
SUBSTITUTE(Email, LEFT(Email, FIND("@", Email)), "www.")
```

Finds the position of the @ symbol in a personal email address to determine the length of text to replace with “www.”, thereby deriving its web address. For example, if the Email value is "abc@steedos.cn", running the formula will return "www.steedos.cn".



<alert type="info">
■ Each term within quotes is case-sensitive.

■ If the old text appears multiple times, each occurrence of the old text will be replaced with the provided new text value, even if this results in duplicates.

</alert>

### TEXT

Converts percentage, number, date, datetime, or currency type fields to text anywhere in a formula.

**Usage:** TEXT(value)

**Parameters:** `number/date/datetime/select` The field or expression you want to convert to text format.

**Return Value:** Text

```javascript
TEXT(ExpectedRevenue)
```
## Advanced Functions

### REGEX

Compares a text field against a regular expression, returning TRUE if it matches. Otherwise, it returns FALSE. A regular expression is a string that describes the format of a string according to certain syntax rules.

**Usage:** REGEX(text, regex_text)

**Parameters:**

* *text:* `text` The full text or field you want to compare.
* *regex_text:* `text` The regular expression you want to match.

**Return Value:** Boolean

***Validation Rule Example:***

This example ensures that a field named ID matches a regular expression representing an ***ID card number*** in the format 310000YYYYMMDD0000.

```javascript
NOT(REGEX(ID, "[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)"))
```



<alert type="info">
■ The syntax for regular expressions is based on Java Platform SE 6 syntax. However, the escape character () is not supported, and double backslashes (\\) are also not supported. To match special symbols, use square brackets, e.g., to match a period '.', write '[.]'.

■ The regex engine in formulas matches the entire string, not just searching for a match within the string. For example, if you are searching for the name Marc Benioff, then the regular expression .*Marc Benioff.* will find a match in: `According to Marc Benioff, the social enterprise increases customer success.` Using the regular expression `Marc Benioff` will only match the following string: `Marc Benioff`

■ The regex engine in formulas matches the entire string, meaning the start (^) and end ($) placeholders are implicitly placed at the start and end of the expression. You don't need to add these placeholders.

■ Capture groups and replacements will be ignored.

■ \\w, \\d, and other such expressions are not supported; use [a-zA-Z0-9_], [0-9] instead.

</alert>

## Text Functions

### TRIM

Removes spaces and tabs from the beginning and end of a text string.

**Usage:** TRIM(text)

**Parameter:** `text` Replace text with the field or expression you want to trim.

**Return Value:** Text

```javascript
TRIM(LEFT(LastName,5)) & "-" & RIGHT(FirstName, 1)
```

Provides users with a network ID, which separates the first five characters of their surname and the first character of their first name with a hyphen.

### UPPER

Converts all letters in a specified text string to uppercase. Any character that is not a letter is not affected. Regional rules are applied if provided.

**Usage:** UPPER(text)

**Parameter:** `text` Replace text with the field or expression you want to convert to uppercase.

**Return Value:** Text

```javascript
UPPER("mycompany.com")
```

Returns "MYCOMPANY.COM."

```javascript
UPPER("Mycompany.com 123")
```

Returns "MYCOMPANY.COM 123."

### VALUE

Converts a text string to a number.

**Usage:** VALUE(text)

**Parameter:** `text` The field or expression you want to convert to a number.

**Return Value:** Numeric

***Examples:***

***1. Lead Number***

```javascript
VALUE(Lead_Number__c)
```

Returns the number corresponding to the text value in the auto-number field Lead Number. This can be useful if you want to use the Lead Number field in calculations. Note that the auto-number field is actually a text field and must be converted to a number field for numerical calculations.

***2. Lead Round-Robin Assignment***

```javascript
MOD(VALUE(Lead_Number__c), 3)
```

This formula applies to a custom formula field named Round_Robin_ID, assigning 0, 1, or 2 to each lead. The formula uses a custom auto-number field named Lead Number, which assigns a unique number starting at 1 to each lead. The MOD function divides the number of leads by the number of available lead queues (3 in this example) and then returns the remainder value 0, 1, or 2. Use the value of this formula field in your lead assignment rules to distribute lead records to different queues. For example:

* Round_Robin_ID = 0 is assigned to Queue A
* Round_Robin_ID = 1 is assigned to Queue B
* Round_Robin_ID = 2 is assigned to Queue C



<alert type="info">
Ensure that the text in the VALUE function does not contain any special characters other than a decimal point (dot) or negative sign (hyphen). For example, the formula VALUE(Text_field__c) produces the following results:

■ If the text field is 123, the result is 123.

■ If the text field is 0, it returns an error message.

■ If the text field is blank, it returns an error message.

■ If the text field is $123, it returns an error message.

</alert>
