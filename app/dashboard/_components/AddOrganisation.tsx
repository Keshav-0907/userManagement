import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddOrganisation = ({ setFormData, formData, handleNewOrg }) => {

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <Dialog>
            <DialogTrigger>
               <div className="bg-[#034F75] text-white rounded-md p-2 font-semibold">
               Add Organisation
               </div>
            </DialogTrigger>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Add New Organisation</DialogTitle>
                    <DialogDescription className="flex flex-col gap-4 py-2">
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Organisation Name"
                        />
                        <Input
                            name="adminName"
                            value={formData.adminName}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Organisation Admin Name"
                        />
                        <Input
                            name="adminEmail"
                            value={formData.adminEmail}
                            onChange={handleInputChange}
                            type="email"
                            placeholder="Organisation Admin Email"
                        />
                        <Button className="bg-[#034F75]" onClick={handleNewOrg}>Add Organisation</Button>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default AddOrganisation;
