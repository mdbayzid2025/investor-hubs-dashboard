export const monthlyData = {
  '2025': [
    { month: 'Jan', total: 598, paid: 418, free: 180, newSignups: 55 },
    { month: 'Feb', total: 658, paid: 465, free: 193, newSignups: 60 },
    { month: 'Mar', total: 0, paid: 0, free: 0, newSignups: 0 },
    { month: 'Apr', total: 0, paid: 0, free: 0, newSignups: 0 },
    { month: 'May', total: 0, paid: 0, free: 0, newSignups: 0 },
    { month: 'Jun', total: 0, paid: 0, free: 0, newSignups: 0 },
    { month: 'Jul', total: 0, paid: 0, free: 0, newSignups: 0 },
    { month: 'Aug', total: 0, paid: 0, free: 0, newSignups: 0 },
    { month: 'Sep', total: 0, paid: 0, free: 0, newSignups: 0 },
    { month: 'Oct', total: 0, paid: 0, free: 0, newSignups: 0 },
    { month: 'Nov', total: 0, paid: 0, free: 0, newSignups: 0 },
    { month: 'Dec', total: 0, paid: 0, free: 0, newSignups: 0 }
  ],
  '2024': [
    { month: 'Jan', total: 145, paid: 89, free: 56, newSignups: 23 },
    { month: 'Feb', total: 168, paid: 102, free: 66, newSignups: 23 },
    { month: 'Mar', total: 195, paid: 118, free: 77, newSignups: 27 },
    { month: 'Apr', total: 224, paid: 138, free: 86, newSignups: 29 },
    { month: 'May', total: 258, paid: 162, free: 96, newSignups: 34 },
    { month: 'Jun', total: 289, paid: 183, free: 106, newSignups: 31 },
    { month: 'Jul', total: 324, paid: 208, free: 116, newSignups: 35 },
    { month: 'Aug', total: 362, paid: 236, free: 126, newSignups: 38 },
    { month: 'Sep', total: 401, paid: 265, free: 136, newSignups: 39 },
    { month: 'Oct', total: 445, paid: 298, free: 147, newSignups: 44 },
    { month: 'Nov', total: 492, paid: 334, free: 158, newSignups: 47 },
    { month: 'Dec', total: 543, paid: 375, free: 168, newSignups: 51 }
  ],
  '2023': [
    { month: 'Jan', total: 45, paid: 28, free: 17, newSignups: 12 },
    { month: 'Feb', total: 52, paid: 32, free: 20, newSignups: 7 },
    { month: 'Mar', total: 61, paid: 38, free: 23, newSignups: 9 },
    { month: 'Apr', total: 73, paid: 46, free: 27, newSignups: 12 },
    { month: 'May', total: 85, paid: 54, free: 31, newSignups: 12 },
    { month: 'Jun', total: 98, paid: 63, free: 35, newSignups: 13 },
    { month: 'Jul', total: 112, paid: 72, free: 40, newSignups: 14 },
    { month: 'Aug', total: 127, paid: 82, free: 45, newSignups: 15 },
    { month: 'Sep', total: 143, paid: 93, free: 50, newSignups: 16 },
    { month: 'Oct', total: 160, paid: 105, free: 55, newSignups: 17 },
    { month: 'Nov', total: 178, paid: 118, free: 60, newSignups: 18 },
    { month: 'Dec', total: 197, paid: 132, free: 65, newSignups: 19 }
  ],
  '2022': [
    { month: 'Jan', total: 12, paid: 8, free: 4, newSignups: 3 },
    { month: 'Feb', total: 15, paid: 10, free: 5, newSignups: 3 },
    { month: 'Mar', total: 19, paid: 13, free: 6, newSignups: 4 },
    { month: 'Apr', total: 23, paid: 16, free: 7, newSignups: 4 },
    { month: 'May', total: 27, paid: 19, free: 8, newSignups: 4 },
    { month: 'Jun', total: 31, paid: 22, free: 9, newSignups: 4 },
    { month: 'Jul', total: 35, paid: 25, free: 10, newSignups: 4 },
    { month: 'Aug', total: 40, paid: 28, free: 12, newSignups: 5 },
    { month: 'Sep', total: 45, paid: 32, free: 13, newSignups: 5 },
    { month: 'Oct', total: 51, paid: 36, free: 15, newSignups: 6 },
    { month: 'Nov', total: 57, paid: 41, free: 16, newSignups: 6 },
    { month: 'Dec', total: 64, paid: 46, free: 18, newSignups: 7 }
  ]
};

  export const users: any[] = [
    {
      id: 1,
      name: 'Michael Chen',
      email: 'michael.c@email.com',
      phone: '+1 (555) 123-4567',
      signupDate: '2024-01-18',
      status: 'pending',
      role: 'Investor',
      investorType: 'Individual',
      kycStatus: 'submitted',
      kycDocuments: {
        idProof: true,
        addressProof: true,
        financialDocs: true
      },
      totalInvestments: 0,
      lastActive: '2024-01-22'
    },
    {
      id: 1012,
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
      phone: '+1 (555) 123-4567',
      signupDate: '2024-01-10',
      status: 'approved',
      role: 'Investor',
      investorType: 'Individual',
      kycStatus: 'verified',
      kycDocuments: {
        idProof: true,
        addressProof: true,
        financialDocs: true
      },
      totalInvestments: 5,
      lastActive: '2024-01-22'
    },
    {
      id: 2034,
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      phone: '+1 (555) 765-4321',
      signupDate: '2024-01-08',
      status: 'approved',
      role: 'Agent',
      companyName: 'Premium Realty',
      kycStatus: 'verified',
      kycDocuments: {
        idProof: true,
        addressProof: true,
        financialDocs: true
      },
      listedProperties: 12,
      lastActive: '2024-01-21'
    },
    {
      id: 4012,
      name: 'David Martinez',
      email: 'david.martinez@example.com',
      phone: '+1 (555) 321-6549',
      signupDate: '2024-01-05',
      status: 'approved',
      role: 'Property Owner',
      companyName: 'Martinez Properties',
      kycStatus: 'verified',
      kycDocuments: {
        idProof: true,
        addressProof: true,
        financialDocs: true
      },
      listedProperties: 8,
      lastActive: '2024-01-20'
    },
    {
      id: 2,
      name: 'ABC Developers Ltd',
      email: 'contact@abcdev.com',
      phone: '+1 (555) 234-5678',
      signupDate: '2024-01-18',
      status: 'approved',
      role: 'Property Owner',
      companyName: 'ABC Developers Ltd',
      kycStatus: 'verified',
      kycDocuments: {
        idProof: true,
        addressProof: true,
        financialDocs: true
      },
      listedProperties: 8,
      lastActive: '2024-01-22'
    },
    {
      id: 3,
      name: 'David Martinez',
      email: 'david.m@email.com',
      phone: '+1 (555) 345-6789',
      signupDate: '2024-01-17',
      status: 'approved',
      role: 'Investor',
      investorType: 'Individual',
      kycStatus: 'verified',
      kycDocuments: {
        idProof: true,
        addressProof: true,
        financialDocs: true
      },
      totalInvestments: 3,
      lastActive: '2024-01-21'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah.w@realty.com',
      phone: '+1 (555) 456-7890',
      signupDate: '2024-01-17',
      status: 'approved',
      role: 'Agent',
      companyName: 'Premium Realty',
      kycStatus: 'verified',
      kycDocuments: {
        idProof: true,
        addressProof: true,
        financialDocs: true
      },
      listedProperties: 5,
      lastActive: '2024-01-20'
    },
    {
      id: 5,
      name: 'James Anderson',
      email: 'james.a@email.com',
      phone: '+1 (555) 567-8901',
      signupDate: '2024-01-16',
      status: 'approved',
      role: 'Investor',
      investorType: 'Corporate',
      kycStatus: 'verified',
      kycDocuments: {
        idProof: true,
        addressProof: true,
        financialDocs: true
      },
      totalInvestments: 5,
      lastActive: '2024-01-22'
    },
    {
      id: 6,
      name: 'Lisa Park',
      email: 'lisa.p@email.com',
      phone: '+1 (555) 678-9012',
      signupDate: '2024-01-15',
      status: 'rejected',
      role: 'Investor',
      investorType: 'Individual',
      kycStatus: 'rejected',
      kycDocuments: {
        idProof: false,
        addressProof: false,
        financialDocs: false
      },
      totalInvestments: 0,
      lastActive: '2024-01-18'
    }
  ];