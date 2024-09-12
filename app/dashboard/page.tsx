'use client';
import React, { useEffect, useState } from 'react';
import DashboardHeader from './_components/DashboardHeader';
import DashboardTable from './_components/DashboardTable';
import OptionsBar from './_components/OptionsBar';
import AddOrganisation from './_components/AddOrganisation';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import useAuth from '@/hooks/useAuth';

const Dashboard = () => {
  const { isAuthorised, loading } = useAuth();
  const router = useRouter();
  const [organisations, setOrganisations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    adminName: '',
    adminEmail: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState({ members: '', date: '' });

  useEffect(() => {
    if (!loading && !isAuthorised) {
      router.push('/'); // Redirect to login if not authorized
    }
  }, [isAuthorised, loading, router]);

  useEffect(() => {
    const getAllOrganisations = async () => {
      try {
        setIsLoading(true);
        const res = await axios.post('/api/organisation/getAll');
        setOrganisations(res.data.data);
      } catch (error) {
        console.error('Error fetching organisations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthorised) {
      getAllOrganisations();
    }
  }, [isAuthorised]);

  if (loading || isLoading) {
    return <div>Loading...</div>;
  }

  const handleNewOrg = async () => {
    const res = await axios.post('/api/organisation/addNew', {
      name: formData.name,
      adminName: formData.adminName,
      adminEmail: formData.adminEmail,
    });

    if (res.data.status === 'success') {
      setOrganisations([...organisations, res.data.data]);
      setFormData({
        name: '',
        adminName: '',
        adminEmail: '',
      });
      alert('Organisation added successfully');
    }
  };

  // Filter organisations based on search term
  const filteredOrganisations = organisations.filter((org) =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort organisations based on selected options
  const sortedOrganisations = filteredOrganisations.sort((a, b) => {
    // Sorting by member count
    if (sortOption.members) {
      return sortOption.members === 'asc' ? a.members - b.members : b.members - a.members;
    }
    // Sorting by date
    if (sortOption.date) {
      return sortOption.date === 'newer' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
    }
    return 0;
  });

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">All Organisations</h1>
        <AddOrganisation setFormData={setFormData} formData={formData} handleNewOrg={handleNewOrg} />
      </div>
      <OptionsBar setSearchTerm={setSearchTerm} setSortOption={setSortOption} />
      <div className="border rounded-xl p-2">
        <DashboardTable organisations={sortedOrganisations} />
      </div>
    </div>
  );
};

export default Dashboard;
