import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  TextInput,
  Title,
} from '@tremor/react';
import { client } from '../../client';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react';
import { useNavigate } from 'react-router-dom';

const GatewayTable = () => {
  const navigate = useNavigate();
  const [gateways, setGateways] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(15);
  const [pageInfo, setPageInfo] = useState({});
  async function getGatewayes(page = 1, limit = 15, searchKey = '') {
    const { data } = await client.GET('/api/gateways', {
      params: {
        query: {
          page,
          limit,
          searchKey,
        },
      },
    });
    if (data) {
      setGateways(data.data?.items);
      setPageInfo(data.data?.pageInfo);
    }
  }
  useEffect(() => {
    getGatewayes(page, limit, searchKey);
  }, [page, limit, searchKey]);
  return (
    <Card className="mt-4 w-full max-h-70">
      <div className="py-2 flex">
        <TextInput
          placeholder="Search..."
          onKeyUp={(e) => setSearchKey(e.target.value)}
        />
        <button
            type="submit"
            className="whitespace-nowrap ml-2 rounded-tremor-default bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis"
            onClick={(() => navigate('/create'))}
          >
            New
          </button>
      </div>
      <Title>Gateway List</Title>
      <Table className="mt-5 w-full">
        <TableHead>
          <TableRow className="text-left">
            <TableHeaderCell className="pl-2">Name</TableHeaderCell>
            <TableHeaderCell className="pl-2">IPV4</TableHeaderCell>
            <TableHeaderCell className="pl-2">Serial Number</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {gateways.map((item) => (
            <TableRow
              onClick={() => navigate(`/${item.name}`)}
              className="even:bg-tremor-background-muted hover:bg-gray-100 hover:cursor-pointer"
              key={item.id}
            >
              <TableCell className="py-5 pl-2">{item.name}</TableCell>
              <TableCell className="py-5 pl-2">{item.ipv4}</TableCell>
              <TableCell className="py-5 pl-2">{item.serialNumber}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-10 flex items-center justify-between">
        <p className="text-tremor-default tabular-nums text-tremor-content">
          Page{' '}
          <span className="font-medium text-tremor-content-strong ">{`${page}`}</span>{' '}
          of
          <span className="font-medium text-tremor-content-strong ">
            {' '}
            {`${Math.ceil(pageInfo.totalCount / limit) || 0}`}
          </span>
        </p>
        <div className="inline-flex items-center rounded-tremor-full shadow-tremor-input ring-1 ring-inset ring-tremor-ring">
          <Button
            onClick={() => setPage(page - 1)}
            disabled={!pageInfo.hasBefore}
          >
            <span className="sr-only">Previous</span>
            <RiArrowLeftSLine
              className="size-5 text-tremor-content-emphasis group-hover:text-tremor-content-strong "
              aria-hidden={true}
            />
          </Button>
          <span
            className="h-5 border-r border-tremor-border"
            aria-hidden={true}
          />
          <Button
            onClick={() => setPage(page + 1)}
            disabled={!pageInfo.hasNext}
          >
            <span className="sr-only">Next</span>
            <RiArrowRightSLine
              className="size-5 text-tremor-content-emphasis group-hover:text-tremor-content-strong "
              aria-hidden={true}
            />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GatewayTable;
