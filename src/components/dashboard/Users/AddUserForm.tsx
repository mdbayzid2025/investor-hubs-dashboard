

import { Upload, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";


interface AddUserFormProps {
  onSubmit?: (formData: FormData) => void;
  onCancel?: () => void;
}

export default function AddUserForm({ onSubmit, onCancel }: AddUserFormProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0); // used to reset file input

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setFileInputKey((prev) => prev + 1); // reset file input
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);    
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Picture Upload */}
      <div>
        <Label className="text-sm font-semibold text-gray-800 uppercase mb-3 block">
          Profile Picture
        </Label>
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 rounded-full border-2 border-gray-200 overflow-hidden bg-gray-50 flex-shrink-0">
            {profileImage ? (
              <>
                <img
                  src={profileImage}
                  alt="Profile preview"                  
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600 transition-colors"
                >
                  <X size={14} />
                </button>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Upload size={28} />
              </div>
            )}
          </div>

          <div className="flex-1">
            <Input
              key={fileInputKey}
              id="profilePicture"
              name="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="bg-white cursor-pointer"
            />
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG or WEBP (recommended: 512×512 or larger)
            </p>
          </div>
        </div>
      </div>

      {/* User Information */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">
          User Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input            
              id="username"
              name="username"
              placeholder="lucky.jesse"
              className="bg-white h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="jesse@example.com"
              className="bg-white h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              name="firstName"
              placeholder="Lucky"
              className="bg-white h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              name="lastName"
              placeholder="Jesse"
              className="bg-white h-11"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 uppercase mb-4">
          Contact Information
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
              className="bg-white h-11"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" placeholder="New York" className="bg-white h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                name="country"
                placeholder="United States"
                className="bg-white h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal">Postal code</Label>
              <Input
                id="postal"
                name="postalCode"
                placeholder="10001"
                className="bg-white h-11"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="+1 234-567-8900"
              className="bg-white h-11"
            />
          </div>
        </div>
      </div>     

      {/* About */}
      <div>        
        <div className="space-y-2">
          <Label htmlFor="about">Bio</Label>
          <Textarea
            id="about"
            name="about"
            placeholder="Write something about the user..."
            rows={10}
            className="bg-white resize-none"
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button type="button" size="lg"  className=" text-gray-700! bg-transparent! border-2! border-gray-200!" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" size="lg" className="bg-indigo-600 hover:bg-indigo-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>
    </form>
  );
}