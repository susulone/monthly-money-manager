import { useContext } from "react";

// Context
import { SearchContext } from "../../app/context/SearchContext";

// Components
import { TransactionItem } from "./TransactionItem";

export type TransactionItemType = {
    id: string;
    monthlyBudgetId: string;
    budgetGroup: string;
    category: string;
    date: string;
    identifier: string;
    amount: number;
    transactionType: string;
};

type TransactionsListProps = {
    transactions: TransactionItemType[];
    handleTransactionEdit: (
        id: string,
        budgetGroup: string,
        category: string,
        date: string,
        identifier: string,
        amount: string,
        transactionType: string
    ) => void;
    handleTransactionDelete: (id: string | number) => void;
};

export const TransactionsList = ({
    transactions,
    handleTransactionEdit,
    handleTransactionDelete,
}: TransactionsListProps) => {
    const { searchQuery } = useContext(SearchContext);

    return (
        <section className="transaction-list">
            {searchQuery?.length <= 0
                ? transactions.map((transaction: TransactionItemType) => {
                      return (
                          <TransactionItem
                              key={transaction.id}
                              transaction={transaction}
                              handleTransactionEdit={handleTransactionEdit}
                              handleTransactionDelete={handleTransactionDelete}
                          />
                      );
                  })
                : transactions
                      .filter((transaction: TransactionItemType) => {
                          if (
                              searchQuery.length >= 1 &&
                              transaction.identifier
                                  .toLowerCase()
                                  .includes(searchQuery.toLowerCase())
                          ) {
                              return transaction;
                          }
                      })
                      .map((transaction: TransactionItemType) => {
                          return (
                              <TransactionItem
                                  key={transaction.id}
                                  transaction={transaction}
                                  handleTransactionEdit={handleTransactionEdit}
                                  handleTransactionDelete={
                                      handleTransactionDelete
                                  }
                              />
                          );
                      })}
        </section>
    );
};
