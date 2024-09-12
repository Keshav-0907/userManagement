import { Input } from '@/components/ui/input';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const OptionsBar = ({ setSearchTerm, setSortOption }) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortByMembers = (value) => {
    setSortOption((prev) => ({ ...prev, members: value === 'lowToHigh' ? 'asc' : 'desc', date: '' }));
  };

  const handleSortByDate = (value) => {
    setSortOption((prev) => ({ ...prev, date: value === 'newer' ? 'newer' : 'older', members: '' }));
  };

  return (
    <div className="flex gap-5 py-5">
      <Input placeholder="Search" onChange={handleSearchChange} />
      <Select onValueChange={handleSortByMembers}>
        <SelectTrigger className="w-[500px]">
          <SelectValue placeholder="Sort by Members" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="lowToHigh">Low to High</SelectItem>
          <SelectItem value="highToLow">High to Low</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={handleSortByDate}>
        <SelectTrigger className="w-[500px]">
          <SelectValue placeholder="Sort by Date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newer">Newer First</SelectItem>
          <SelectItem value="older">Older First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default OptionsBar;
