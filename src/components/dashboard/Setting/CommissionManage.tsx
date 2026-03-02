import { DollarSign } from 'lucide-react';
import { Card, CardContent } from "../../ui/card";
// pages/settings/SettingsPage.tsx
import { Loader2, Save } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useState } from 'react';


const CommissionManage = () => {
    const [loading, setIsLoading] = useState(false);
    // Pricing State
    const [pricingSettings, setPricingSettings] = useState({
        commissionRate: "15",
        platformFee: "0",
        description: ""
    });
    const handleSavePricing = async () => {
        setIsLoading(true);
        console.log("Saving pricing settings:", pricingSettings);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
    };

    return (
        <Card className="border-none shadow-sm max-w-6xl mx-auto">
            <CardContent className="px-8 pb-8">
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <DollarSign className="h-6 w-6" />
                        <h2 className="text-2xl font-bold">Commission & Fee Structure</h2>
                    </div>

                    <div className="grid  gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="commissionRate">Platform Commission Rate (%)</Label>
                            <Input
                                id="commissionRate"
                                type="number"
                                value={pricingSettings.commissionRate}
                                onChange={(e) => setPricingSettings({ ...pricingSettings, commissionRate: e.target.value })}
                                className="h-12"
                                placeholder="15"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="platformFee">Base Platform Fee ($)</Label>
                            <Input
                                id="platformFee"
                                type="number"
                                value={pricingSettings.platformFee}
                                onChange={(e) => setPricingSettings({ ...pricingSettings, platformFee: e.target.value })}
                                className="h-12"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <Button
                        onClick={handleSavePricing}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </>
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default CommissionManage