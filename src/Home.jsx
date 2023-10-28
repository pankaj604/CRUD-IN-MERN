import { useState } from "react";

const Home = () => {
  const [bankAccounts, setBankAccounts] = useState([
    { id: 1, name: "John Doe", balance: 5000, bankName: "Bank A" },
    { id: 2, name: "Alice Smith", balance: 3000, bankName: "Bank B" },
  ]);

  const [newAccount, setNewAccount] = useState({
    name: "",
    balance: 0,
    bankName: "",
  });
  const [editAccount, setEditAccount] = useState(null);

  const addAccount = () => {
    setBankAccounts((prevAccounts) => [
      ...prevAccounts,
      {
        id: Date.now(),
        ...newAccount,
      },
    ]);
    setNewAccount({ name: "", balance: 0, bankName: "" });
  };

  const updateAccount = () => {
    if (editAccount) {
      setBankAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.id === editAccount.id
            ? { ...account, ...newAccount }
            : account
        )
      );
      setEditAccount(null);
      setNewAccount({ name: "", balance: 0, bankName: "" });
    }
  };

  const deleteAccount = (id) => {
    setBankAccounts((prevAccounts) =>
      prevAccounts.filter((account) => account.id !== id)
    );
  };

  const editAccountData = (account) => {
    setEditAccount(account);
    setNewAccount({
      name: account.name,
      balance: account.balance,
      bankName: account.bankName,
    });
  };

  return (
    <>
      <div>
        <h1>Bank Account App by Pankaj Kewat</h1>
        <div>
          <h2>Add/Edit Bank Account</h2>
          <input
            type="text"
            placeholder="Name"
            value={newAccount.name}
            onChange={(e) =>
              setNewAccount({ ...newAccount, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Balance"
            value={newAccount.balance}
            onChange={(e) =>
              setNewAccount({ ...newAccount, balance: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Bank Name"
            value={newAccount.bankName}
            onChange={(e) =>
              setNewAccount({ ...newAccount, bankName: e.target.value })
            }
          />
          {editAccount ? (
            <button onClick={updateAccount}>Update</button>
          ) : (
            <button onClick={addAccount}>Add</button>
          )}
        </div>
        <div>
          <h2>Bank Accounts</h2>
          <ul>
            {bankAccounts.map((account) => (
              <li key={account.id}>
                {account.name} - {account.balance} - {account.bankName}
                <button onClick={() => editAccountData(account)}>Edit</button>
                <button onClick={() => deleteAccount(account.id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Home;
