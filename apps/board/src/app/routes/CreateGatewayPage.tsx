import { RiDeleteBin2Fill, RiDeleteBin2Line } from '@remixicon/react';
import { Divider, Select, SelectItem, TextInput } from '@tremor/react';
import { useState } from 'react';
import { client } from '../../client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function CreateGateway() {
  const [devices, setDevices] = useState([]);
  const [gatewayName, setGatewayName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [ipv4, setIpv4] = useState('');
  const navigate = useNavigate();
  async function addGateway(e) {
    e.preventDefault();
    const { data } = await client.POST('/api/gateways', {
      body: {
        devices: devices.map((device) => {
          delete device.id;
          return device;
        }),
        name: gatewayName,
        serialNumber,
        ipv4,
      },
    });
    if (data.success) {
      navigate('/');
      return;
    }
    toast.error(data.message);
  }
  return (
    <div className="sm:mx-auto sm:max-w-2xl">
      <h3 className="text-tremor-title font-semibold text-tremor-content-strong">
        Create Gateway
      </h3>
      <p>Add a new gateway to your dashboard.</p>
      <form className="mt-8" onSubmit={addGateway}>
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="name"
              className="text-tremor-default font-medium text-tremor-content-strong"
            >
              Gateway Name
              <span className="text-red-500">*</span>
            </label>
            <TextInput
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              placeholder="Gateway Name"
              className="mt-2"
              onChange={(e) => setGatewayName(e.target.value)}
              required
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor="serialNumber"
              className="text-tremor-default font-medium text-tremor-content-strong"
            >
              Serial Number
              <span className="text-red-500">*</span>
            </label>
            <TextInput
              type="text"
              id="serialNumber"
              name="serialNumber"
              autoComplete="serialNumber"
              placeholder="Serial Number"
              className="mt-2"
              onChange={(e) => setSerialNumber(e.target.value)}
              required
            />
          </div>
          <div className="col-span-full">
            <label
              htmlFor="ipv4"
              className="text-tremor-default font-medium text-tremor-content-strong"
            >
              IPV4
              <span className="text-red-500">*</span>
            </label>
            <TextInput
              id="ipv4"
              name="ipv4"
              autoComplete="ipv4"
              placeholder="IPV4"
              className="mt-2"
              onChange={(e) => setIpv4(e.target.value)}
              required
            />
          </div>
          <div className="col-span-full flex justify-between items-center">
            <div>
              <label
                htmlFor="ipv4"
                className="text-tremor-default font-medium text-tremor-content-strong"
              >
                Devices
                <span className="text-red-500">*</span>
              </label>
            </div>
            <button
              type="button"
              className="whitespace-nowrap rounded-tremor-default bg-tremor-brand-inverted px-4 py-2.5 text-tremor-default text-tremor-brand font-semibold text-lg"
              onClick={() => {
                if (devices.length < 10)
                  setDevices([
                    ...devices,
                    { vendor: '', status: 'online', id: Math.random() * 100 },
                  ]);
              }}
            >
              +
            </button>
          </div>
          <div className="col-span-full">
            {devices.map((device) => (
              <div
                className="flex justify-between items-center"
                key={device.id}
              >
                <div className="w-100 flex-1">
                  <TextInput
                    type="text"
                    id="vendor"
                    name="vendor"
                    autoComplete="vendor"
                    placeholder="Device Vendor"
                    className="mt-2 w-full flex-1"
                    required
                    onKeyUp={(e) =>
                      setDevices(
                        devices.map((dev) =>
                          dev.id === device.id
                            ? { ...device, vendor: e.target.value }
                            : dev
                        )
                      )
                    }
                  />
                </div>
                <div>
                  <select
                    onChange={() =>
                      setDevices(
                        devices.map((dev) =>
                          dev.id === device.id
                            ? { ...device, status: 'online' }
                            : dev
                        )
                      )
                    }
                  >
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
                <span>
                  <RiDeleteBin2Line
                    className="text-red-500 ml-2 cursor-pointer"
                    onClick={() =>
                      setDevices(devices.filter((dev) => dev.id !== device.id))
                    }
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
        <Divider />
        <div className="flex items-center justify-end mt-4 space-x-4">
          <button
            type="submit"
            className="whitespace-nowrap rounded-tremor-default bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis"
          >
            Submit
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
