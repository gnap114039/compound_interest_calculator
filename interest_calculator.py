import math

def calculate_compound_interest(start, year_invest_amount, year, interest, show_log=False):
    total = start
    if (show_log): print(f' year 0: {total}')
    compound_interest = 1 + (interest/100.0)
    for i in range(year):
        total = (total+year_invest_amount) * compound_interest
        if (show_log): print(f' year {i+1}: {total}')
    return total


if __name__ == '__main__':
    start = 30000 # 本金
    year_invest_amount = 20000 # 每年投入金額
    year = 25 # 投資總年份
    interest = 12.5 # 年化報酬

    total = calculate_compound_interest(
        start,
        year_invest_amount,
        year,
        interest
    )

    total_invest_amount = start + year*year_invest_amount
    print(
        f'總投入資金: {round(total_invest_amount, 3)} \
        \n淨報酬(總報酬-總投入資金): {round(total - total_invest_amount, 3)} \
        \n總報酬: {round(total, 3)}'
    )