import { useAppSelector } from "../../app/hooks";
import { TransactionItem } from "./TransactionItem";
import { selectAllTransaction } from "./transactionsSlice";

export const TransactionsList = ({ searchQuery }: TransactionsListProps) => {
    const transactions = useAppSelector(selectAllTransaction);

    return (
        <section className="transaction-list">
            {searchQuery.length <= 0
                ? transactions.map((transaction: TransactionItemProps) => {
                      return (
                          <TransactionItem
                              key={transaction.id}
                              id={transaction.id}
                              category={transaction.category}
                              date={transaction.date}
                              identifier={transaction.identifier}
                              amount={transaction.amount}
                              transactionType={transaction.transactionType}
                          />
                      );
                  })
                : transactions
                      .filter((transaction) => {
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
                          return (
                              <TransactionItem
                                  key={transaction.id}
                                  id={transaction.id}
                                  category={transaction.category}
                                  date={transaction.date}
                                  identifier={transaction.identifier}
                                  amount={transaction.amount}
                                  transactionType={transaction.transactionType}
                              />
                          );
                      })}
        </section>
    );
};
