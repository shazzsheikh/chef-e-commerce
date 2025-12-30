// import React, { useEffect, useState } from "react";
// import { API } from "../../api/api";

// const Settings = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const token = localStorage.getItem("admintoken");
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     phonenumber: "",
//   });
//   const [store, setStore] = useState({
//     storename: "City Food Mart",
//     email: "example@example.com",
//     phone: "78901234567",
//     address: "hyderabad, Telangana, India",
//     gstnumber: "aBCDE1234FZ5",
//     currency: "INR",
//   });

//   const fetchAdminData = async () => {
//     // Yahan API call hogi user data fetch karne ke liye
//     try {
//       const res = await API.get("/admin/getadminprofile", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUser(res.data);
//     } catch (err) {
//       console.error("Error fetching user data:", err);
//     }
//   };
//   useEffect(() => {
//     fetchAdminData();
//   }, []);

//   const [formData, setFormData] = useState(user);

//   const handleEditClick = () => {
//     setFormData(user);
//     setIsEditing(true);
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     // API call yahan hogi
//     setUser(formData);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//   };

//   return (
//     <div className=" bg-gray-100 p-4 space-y-3">
//       <div className="w-full bg-white rounded-xl shadow-md p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Account Settings</h2>

//           {!isEditing && (
//             <button onClick={handleEditClick} className="btn-border">
//               Edit
//             </button>
//           )}
//         </div>

//         {/* VIEW MODE */}
//         {!isEditing && (
//           <div className="md:flex md:justify-between space-y-2 text-gray-700">
//             <div>
//               <p className="text-sm font-bold">Name</p>
//               <p className="font-medium">{user.name}</p>
//             </div>
//             <div>
//               <p className="text-sm font-bold">Email</p>
//               <p className="font-medium">{user.email}</p>
//             </div>

//             <div>
//               <p className="text-sm font-bold">Phone</p>
//               <p className="font-medium">{user.phonenumber}</p>
//             </div>
//           </div>
//         )}

//         {/* EDIT MODE */}
//         {isEditing && (
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm text-gray-600">Name</label>
//               <input
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-gray-600">Email</label>
//               <input
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 disabled
//                 className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
//               />
//             </div>

//             <div>
//               <label className="block text-sm text-gray-600">Phone</label>
//               <input
//                 name="phone"
//                 value={formData.phonenumber}
//                 onChange={handleChange}
//                 className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>

//             <div className="flex justify-end gap-3 pt-2">
//               <button
//                 onClick={handleCancel}
//                 className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-100"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleSave}
//                 className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Save Changes
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="w-full bg-white rounded-xl shadow-md p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">Store Settings</h2>

//           {!isEditing && (
//             <button onClick={handleEditClick} className="btn-border">
//               Edit
//             </button>
//           )}
//         </div>
//         {!isEditing && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-700 ">
//             <div>
//               <p className="text-sm font-bold">Store Name</p>
//               <p className="font-medium">{store.storename}</p>
//             </div>
//             <div>
//               <p className="text-sm font-bold">Email</p>
//               <p className="font-medium">{store.email}</p>
//             </div>

//             <div>
//               <p className="text-sm font-bold">Phone</p>
//               <p className="font-medium">{store.phone}</p>
//             </div>
//             <div>
//               <p className="text-sm font-bold">GST Number</p>
//               <p className="font-medium">{store.gstnumber}</p>
//             </div>
//             <div>
//               <p className="text-sm font-bold">Address</p>
//               <p className="font-medium">{store.address}</p>
//             </div>
//             <div>
//               <p className="text-sm font-bold">currency</p>
//               <p className="font-medium">{store.currency}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Settings;
// const PaymentSettings = () => {
//   const [settings, setSettings] = useState({
//     razorpayEnabled: true,
//     stripeEnabled: false,
//     codEnabled: true,
//     testMode: true,
//     currency: "INR",
//     codMin: 0,
//     codMax: 5000,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setSettings({
//       ...settings,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6">
//       <h2 className="text-xl font-semibold">Payment Settings</h2>

//       {/* Test Mode */}
//       <div className="flex justify-between items-center">
//         <div>
//           <p className="font-medium">Test Mode</p>
//           <p className="text-sm text-gray-500">
//             Enable sandbox payments for testing
//           </p>
//         </div>
//         <input
//           type="checkbox"
//           name="testMode"
//           checked={settings.testMode}
//           onChange={handleChange}
//           className="h-5 w-5"
//         />
//       </div>

//       <hr />

//       {/* Razorpay */}
//       <div className="flex justify-between items-center">
//         <div>
//           <p className="font-medium">Razorpay</p>
//           <p className="text-sm text-gray-500">Online payment gateway</p>
//         </div>
//         <input
//           type="checkbox"
//           name="razorpayEnabled"
//           checked={settings.razorpayEnabled}
//           onChange={handleChange}
//           className="h-5 w-5"
//         />
//       </div>

//       {/* Stripe */}
//       <div className="flex justify-between items-center">
//         <div>
//           <p className="font-medium">Stripe</p>
//           <p className="text-sm text-gray-500">International cards & wallets</p>
//         </div>
//         <input
//           type="checkbox"
//           name="stripeEnabled"
//           checked={settings.stripeEnabled}
//           onChange={handleChange}
//           className="h-5 w-5"
//         />
//       </div>

//       <hr />

//       {/* COD */}
//       <div>
//         <div className="flex justify-between items-center">
//           <div>
//             <p className="font-medium">Cash on Delivery (COD)</p>
//             <p className="text-sm text-gray-500">
//               Allow customers to pay on delivery
//             </p>
//           </div>
//           <input
//             type="checkbox"
//             name="codEnabled"
//             checked={settings.codEnabled}
//             onChange={handleChange}
//             className="h-5 w-5"
//           />
//         </div>

//         {settings.codEnabled && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//             <div>
//               <label className="text-sm text-gray-600">
//                 Minimum Order Amount
//               </label>
//               <input
//                 type="number"
//                 name="codMin"
//                 value={settings.codMin}
//                 onChange={handleChange}
//                 className="w-full mt-1 border rounded-lg px-3 py-2"
//               />
//             </div>

//             <div>
//               <label className="text-sm text-gray-600">
//                 Maximum Order Amount
//               </label>
//               <input
//                 type="number"
//                 name="codMax"
//                 value={settings.codMax}
//                 onChange={handleChange}
//                 className="w-full mt-1 border rounded-lg px-3 py-2"
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       <hr />

//       {/* Currency */}
//       <div>
//         <label className="text-sm text-gray-600">Currency</label>
//         <select
//           name="currency"
//           value={settings.currency}
//           onChange={handleChange}
//           className="w-full mt-1 border rounded-lg px-3 py-2"
//         >
//           <option value="INR">INR</option>
//           <option value="USD">USD</option>
//           <option value="EUR">EUR</option>
//         </select>
//       </div>

//       {/* Save Button */}
//       <div className="flex justify-end">
//         <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
//           Save Settings
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentSettings;

import React, { useEffect, useState } from "react";
import { API } from "../../api/api";

const Settings = () => {
  const token = localStorage.getItem("admintoken");
  /* ================= ACCOUNT ================= */
  const [accountEdit, setAccountEdit] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phonenumber: "",
  });
  const [accountForm, setAccountForm] = useState(user);

  /* ================= STORE ================= */
  const [storeEdit, setStoreEdit] = useState(false);
  const [store, setStore] = useState({
    storename: "City Food Mart",
    email: "example@example.com",
    phone: "7890123456",
    address: "Hyderabad, Telangana, India",
    gstnumber: "ABCDE1234FZ5",
    currency: "INR",
  });
  const [storeForm, setStoreForm] = useState(store);

  /* ================= PAYMENT ================= */
  const [payment, setPayment] = useState({
    razorpayEnabled: true,
    stripeEnabled: false,
    codEnabled: true,
    testMode: true,
    currency: "INR",
    codMin: 0,
    codMax: 5000,
  });

  /* ================= FETCH ADMIN ================= */
  useEffect(() => {
    fetchAdmin();
  }, []);

  useEffect(() => {
    setAccountForm(user);
  }, [user]);

  const fetchAdmin = async () => {
    try {
      const res = await API.get("/admin/getadminprofile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= HANDLERS ================= */
  const handleAccountChange = (e) =>
    setAccountForm({ ...accountForm, [e.target.name]: e.target.value });

  const handleStoreChange = (e) =>
    setStoreForm({ ...storeForm, [e.target.name]: e.target.value });

  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPayment({ ...payment, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div className="bg-gray-100 p-4 space-y-6">
      {/* ================= ACCOUNT SETTINGS ================= */}
      <Card
        title="Account Settings"
        editing={accountEdit}
        onEdit={() => setAccountEdit(true)}
      >
        {!accountEdit ? (
          <Grid3>
            <Info label="Name" value={user.name} />
            <Info label="Email" value={user.email} />
            <Info label="Phone" value={user.phonenumber} />
          </Grid3>
        ) : (
          <FormGrid>
            <Input
              name="name"
              value={accountForm.name}
              onChange={handleAccountChange}
            />
            <Input value={accountForm.email} disabled />
            <Input
              name="phonenumber"
              value={accountForm.phonenumber}
              onChange={handleAccountChange}
            />
            <Actions
              onCancel={() => setAccountEdit(false)}
              onSave={() => {
                setUser(accountForm);
                setAccountEdit(false);
              }}
            />
          </FormGrid>
        )}
      </Card>

      {/* ================= STORE SETTINGS ================= */}
      <Card
        title="Store Settings"
        editing={storeEdit}
        onEdit={() => setStoreEdit(true)}
      >
        {!storeEdit ? (
          <Grid3>
            <Info label="Store Name" value={store.storename} />
            <Info label="Email" value={store.email} />
            <Info label="Phone" value={store.phone} />
            <Info label="GST" value={store.gstnumber} />
            <Info label="Address" value={store.address} />
            <Info label="Currency" value={store.currency} />
          </Grid3>
        ) : (
          <FormGrid>
            {Object.entries(storeForm).map(([k, v]) => (
              <Input key={k} name={k} value={v} onChange={handleStoreChange} />
            ))}
            <Actions
              onCancel={() => setStoreEdit(false)}
              onSave={() => {
                setStore(storeForm);
                setStoreEdit(false);
              }}
            />
          </FormGrid>
        )}
      </Card>

      {/* ================= PAYMENT SETTINGS ================= */}
      <Card title="Payment Settings">
        <Toggle
          label="Test Mode"
          name="testMode"
          value={payment.testMode}
          onChange={handlePaymentChange}
        />
        <Toggle
          label="Razorpay"
          name="razorpayEnabled"
          value={payment.razorpayEnabled}
          onChange={handlePaymentChange}
        />
        <Toggle
          label="Stripe"
          name="stripeEnabled"
          value={payment.stripeEnabled}
          onChange={handlePaymentChange}
        />
        <Toggle
          label="Cash on Delivery"
          name="codEnabled"
          value={payment.codEnabled}
          onChange={handlePaymentChange}
        />

        {payment.codEnabled && (
          <FormGrid>
            <Input
              name="codMin"
              value={payment.codMin}
              onChange={handlePaymentChange}
            />
            <Input
              name="codMax"
              value={payment.codMax}
              onChange={handlePaymentChange}
            />
          </FormGrid>
        )}

        <div className="flex justify-end">
          <button className="btn-border">Save Payment Settings</button>
        </div>
      </Card>
    </div>
  );
};

/* ================= SMALL UI HELPERS ================= */

const Card = ({ title, editing, onEdit, children }) => (
  <div className="bg-white rounded-xl shadow p-6 space-y-4">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      {!editing && onEdit && (
        <button onClick={onEdit} className="btn-border">
          Edit
        </button>
      )}
    </div>
    {children}
  </div>
);

const Grid3 = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {children}
  </div>
);

const FormGrid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm font-bold">{label}</p>
    <p className="text-gray-700">{value}</p>
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
  />
);

const Toggle = ({ label, name, value, onChange }) => (
  <div className="flex justify-between items-center">
    <p className="font-medium">{label}</p>
    <input type="checkbox" name={name} checked={value} onChange={onChange} />
  </div>
);

const Actions = ({ onCancel, onSave }) => (
  <div className="flex justify-end gap-3 col-span-full">
    <button onClick={onCancel} className="btn-border">
      Cancel
    </button>
    <button onClick={onSave} className="btn-border">
      Save
    </button>
  </div>
);

export default Settings;
