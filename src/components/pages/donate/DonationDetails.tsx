import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DonationDetails() {
  return (
    <section className="w-full px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-violet mb-12">
          Donation Details
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bank Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-soft-paste">
                Bank Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="font-medium">Account Name:</span> Anonymous
                Voices
              </div>
              <div>
                <span className="font-medium">Account Number:</span>{" "}
                110*****9577
              </div>
              <div>
                <span className="font-medium">Bank Name:</span> Dutch Bangla
                Bank Ltd.
              </div>
              <div>
                <span className="font-medium">Branch Name:</span> Mirpur 10
                Branch.
              </div>
              <div>
                <span className="font-medium">Routing No:</span> 092548183
              </div>
            </CardContent>
          </Card>

          {/* Online Banking Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-soft-paste">
                Online Banking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="font-medium">Account Name:</span> Anonymous
                Voices
              </div>
              <div>
                <span className="font-medium">Bkash:</span> 110*****9577
              </div>
              <div>
                <span className="font-medium">Nagad:</span> 215462321548.
              </div>
              <div>
                <span className="font-medium">Rocket:</span> 12458796542
              </div>
              <div>
                <span className="font-medium">Upay:</span> 09254818353
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Thank You Message */}
        <div className="rounded-xl p-6 text-muted-foreground bg-soft-paste-light-hover leading-relaxed text-sm">
          Thank you for your generous donation to Anonymous Voice. Your support
          is invaluable in our mission to promote mental health awareness and
          provide essential resources to those in need. With your contribution,
          we can continue to make a meaningful impact in our community and
          beyond, offering hope and support to individuals facing mental health
          challenges. Together, we are creating a brighter future for mental
          well-being. Thank you once again for your kindness and generosity.
        </div>
      </div>
    </section>
  );
}
