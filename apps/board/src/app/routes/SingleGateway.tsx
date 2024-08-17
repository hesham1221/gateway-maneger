import { RiDeleteBin2Fill, RiDeleteBin2Line } from '@remixicon/react';
import { Divider, Select, SelectItem, TextInput } from '@tremor/react';
import { useEffect, useState } from 'react';
import { client } from '../../client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams, useRoutes } from 'react-router-dom';

export default function SingleGateway() {
  const { name } = useParams();
  const [devices, setDevices] = useState([]);
  const [gateway, setGateway] = useState({});
  useEffect(() => {
    async function getGateway() {
      const { data } = await client.GET('/api/gateways/{id}', {
        params: {
          path: { id: name },
        },
      });
      setGateway(data.data);
      setDevices(data.data.devices);
    }
    getGateway();
  }, [name]);
  async function removeDevice(device) {
    try {
      const { data } = await client.DELETE(
        '/api/gateways/{id}/devices/{deviceUId}',
        {
          params: {
            path: { id: gateway._id, deviceUId: device.uid },
          },
        }
      );
      if (data.success) toast.success('Device removed successfully');
    } catch (error) {
      toast.error('Failed to remove device');
      return;
    }
    setDevices(devices.filter((d) => d.uid !== device.uid));
  }
  return (
    <div className="sm:mx-auto sm:max-w-2xl">
      <h3 className="text-tremor-title font-semibold text-tremor-content-strong">
        Create Gateway
      </h3>
      <p>Add a new gateway to your dashboard.</p>
      <form className="mt-8">
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
              value={gateway.name}
              disabled
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
              value={gateway.serialNumber}
              disabled
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
              value={gateway.ipv4}
              disabled
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
          </div>
          <div className="col-span-full">
            {devices.map((device) => (
              <div
                className="flex justify-between items-center"
                key={device.uid}
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
                    value={device.vendor}
                    disabled
                  />
                </div>
                <div>
                  <select disabled>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
                <span>
                  <RiDeleteBin2Line
                    className="text-red-500 ml-2 cursor-pointer"
                    onClick={() => removeDevice(device)}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
