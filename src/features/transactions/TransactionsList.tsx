import { useAppSelector } from "../../app/hooks";
import { TransactionItem } from "./TransactionItem";
import { selectAllTransaction } from "./transactionsSlice";

export const TransactionsList = ({ searchQuery }: TransactionsListProps) => {
    const transactions = useAppSelector(selectAllTransaction);
    let tabindexStart = 9;

    return (
        <section className="transaction-list">
            {searchQuery.length <= 0
                ? transactions.map((transaction: TransactionItemProps) => {
                      tabindexStart++;
                      return (
                          <TransactionItem
                              key={transaction.id}
                              id={transaction.id}
                              category={transaction.category}
                              date={transaction.date}
                              identifier={transaction.identifier}
                              amount={transaction.amount}
                              transactionType={transaction.transactionType}
                              tabindex={tabindexStart}
                          />
                      );
                  })
                : transactions
                      .filter((transaction: TransactionItem) => {
                          if (
                              searchQuery.length >= 1 &&
                              transaction.identifier
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase())
                          ) {
                              return transaction;
                          }
                      })
                      .map((transaction: TransactionItemProps) => {
                          tabindexStart++;
                          return (
                              <TransactionItem
                                  key={transaction.id}
                                  id={transaction.id}
                                  category={transaction.category}
                                  date={transaction.date}
                                  identifier={transaction.identifier}
                                  amount={transaction.amount}
                                  transactionType={transaction.transactionType}
                                  tabindex={tabindexStart}
                              />
                          );
                      })}
        </section>
    );
};
