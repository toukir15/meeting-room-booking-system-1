import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/icon.png";
import ReactFlagsSelect from "react-flags-select";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useCreateUserMutation } from "../../redux/features/user/userApi";
import { toast } from "sonner";

const countryData = {
  AF: { code: "+93", country: "Afghanistan" },
  AL: { code: "+355", country: "Albania" },
  DZ: { code: "+213", country: "Algeria" },
  AS: { code: "+1-684", country: "American Samoa" },
  AD: { code: "+376", country: "Andorra" },
  AO: { code: "+244", country: "Angola" },
  AI: { code: "+1-264", country: "Anguilla" },
  AG: { code: "+1-268", country: "Antigua and Barbuda" },
  AR: { code: "+54", country: "Argentina" },
  AM: { code: "+374", country: "Armenia" },
  AW: { code: "+297", country: "Aruba" },
  AU: { code: "+61", country: "Australia" },
  AT: { code: "+43", country: "Austria" },
  AZ: { code: "+994", country: "Azerbaijan" },
  BS: { code: "+1-242", country: "Bahamas" },
  BH: { code: "+973", country: "Bahrain" },
  BD: { code: "+880", country: "Bangladesh" },
  BB: { code: "+1-246", country: "Barbados" },
  BY: { code: "+375", country: "Belarus" },
  BE: { code: "+32", country: "Belgium" },
  BZ: { code: "+501", country: "Belize" },
  BJ: { code: "+229", country: "Benin" },
  BM: { code: "+1-441", country: "Bermuda" },
  BT: { code: "+975", country: "Bhutan" },
  BO: { code: "+591", country: "Bolivia" },
  BA: { code: "+387", country: "Bosnia and Herzegovina" },
  BW: { code: "+267", country: "Botswana" },
  BR: { code: "+55", country: "Brazil" },
  IO: { code: "+246", country: "British Indian Ocean Territory" },
  VG: { code: "+1-284", country: "British Virgin Islands" },
  BN: { code: "+673", country: "Brunei" },
  BG: { code: "+359", country: "Bulgaria" },
  BF: { code: "+226", country: "Burkina Faso" },
  BI: { code: "+257", country: "Burundi" },
  KH: { code: "+855", country: "Cambodia" },
  CM: { code: "+237", country: "Cameroon" },
  CA: { code: "+1", country: "Canada" },
  CV: { code: "+238", country: "Cape Verde" },
  KY: { code: "+1-345", country: "Cayman Islands" },
  CF: { code: "+236", country: "Central African Republic" },
  TD: { code: "+235", country: "Chad" },
  CL: { code: "+56", country: "Chile" },
  CN: { code: "+86", country: "China" },
  CO: { code: "+57", country: "Colombia" },
  KM: { code: "+269", country: "Comoros" },
  CK: { code: "+682", country: "Cook Islands" },
  CR: { code: "+506", country: "Costa Rica" },
  HR: { code: "+385", country: "Croatia" },
  CU: { code: "+53", country: "Cuba" },
  CW: { code: "+599", country: "Curacao" },
  CY: { code: "+357", country: "Cyprus" },
  CZ: { code: "+420", country: "Czech Republic" },
  CD: { code: "+243", country: "Democratic Republic of the Congo" },
  DK: { code: "+45", country: "Denmark" },
  DJ: { code: "+253", country: "Djibouti" },
  DM: { code: "+1-767", country: "Dominica" },
  DO: { code: "+1-809", country: "Dominican Republic" },
  TL: { code: "+670", country: "East Timor" },
  EC: { code: "+593", country: "Ecuador" },
  EG: { code: "+20", country: "Egypt" },
  SV: { code: "+503", country: "El Salvador" },
  GQ: { code: "+240", country: "Equatorial Guinea" },
  ER: { code: "+291", country: "Eritrea" },
  EE: { code: "+372", country: "Estonia" },
  ET: { code: "+251", country: "Ethiopia" },
  FJ: { code: "+679", country: "Fiji" },
  FI: { code: "+358", country: "Finland" },
  FR: { code: "+33", country: "France" },
  PF: { code: "+689", country: "French Polynesia" },
  GA: { code: "+241", country: "Gabon" },
  GM: { code: "+220", country: "Gambia" },
  GE: { code: "+995", country: "Georgia" },
  DE: { code: "+49", country: "Germany" },
  GH: { code: "+233", country: "Ghana" },
  GI: { code: "+350", country: "Gibraltar" },
  GR: { code: "+30", country: "Greece" },
  GL: { code: "+299", country: "Greenland" },
  GD: { code: "+1-473", country: "Grenada" },
  GU: { code: "+1-671", country: "Guam" },
  GT: { code: "+502", country: "Guatemala" },
  GG: { code: "+44-1481", country: "Guernsey" },
  GN: { code: "+224", country: "Guinea" },
  GW: { code: "+245", country: "Guinea-Bissau" },
  GY: { code: "+592", country: "Guyana" },
  HT: { code: "+509", country: "Haiti" },
  HN: { code: "+504", country: "Honduras" },
  HK: { code: "+852", country: "Hong Kong" },
  HU: { code: "+36", country: "Hungary" },
  IS: { code: "+354", country: "Iceland" },
  IN: { code: "+91", country: "India" },
  ID: { code: "+62", country: "Indonesia" },
  IR: { code: "+98", country: "Iran" },
  IQ: { code: "+964", country: "Iraq" },
  IE: { code: "+353", country: "Ireland" },
  IM: { code: "+44-1624", country: "Isle of Man" },
  IL: { code: "+972", country: "Israel" },
  IT: { code: "+39", country: "Italy" },
  CI: { code: "+225", country: "Ivory Coast" },
  JM: { code: "+1-876", country: "Jamaica" },
  JP: { code: "+81", country: "Japan" },
  JE: { code: "+44-1534", country: "Jersey" },
  JO: { code: "+962", country: "Jordan" },
  KZ: { code: "+7", country: "Kazakhstan" },
  KE: { code: "+254", country: "Kenya" },
  KI: { code: "+686", country: "Kiribati" },
  XK: { code: "+383", country: "Kosovo" },
  KW: { code: "+965", country: "Kuwait" },
  KG: { code: "+996", country: "Kyrgyzstan" },
  LA: { code: "+856", country: "Laos" },
  LV: { code: "+371", country: "Latvia" },
  LB: { code: "+961", country: "Lebanon" },
  LS: { code: "+266", country: "Lesotho" },
  LR: { code: "+231", country: "Liberia" },
  LY: { code: "+218", country: "Libya" },
  LI: { code: "+423", country: "Liechtenstein" },
  LT: { code: "+370", country: "Lithuania" },
  LU: { code: "+352", country: "Luxembourg" },
  MO: { code: "+853", country: "Macau" },
  MK: { code: "+389", country: "Macedonia" },
  MG: { code: "+261", country: "Madagascar" },
  MW: { code: "+265", country: "Malawi" },
  MY: { code: "+60", country: "Malaysia" },
  MV: { code: "+960", country: "Maldives" },
  ML: { code: "+223", country: "Mali" },
  MT: { code: "+356", country: "Malta" },
  MH: { code: "+692", country: "Marshall Islands" },
  MR: { code: "+222", country: "Mauritania" },
  MU: { code: "+230", country: "Mauritius" },
  YT: { code: "+262", country: "Mayotte" },
  MX: { code: "+52", country: "Mexico" },
  FM: { code: "+691", country: "Micronesia" },
  MD: { code: "+373", country: "Moldova" },
  MC: { code: "+377", country: "Monaco" },
  MN: { code: "+976", country: "Mongolia" },
  ME: { code: "+382", country: "Montenegro" },
  MS: { code: "+1-664", country: "Montserrat" },
  MA: { code: "+212", country: "Morocco" },
  MZ: { code: "+258", country: "Mozambique" },
  MM: { code: "+95", country: "Myanmar" },
  NA: { code: "+264", country: "Namibia" },
  NR: { code: "+674", country: "Nauru" },
  NP: { code: "+977", country: "Nepal" },
  NL: { code: "+31", country: "Netherlands" },
  AN: { code: "+599", country: "Netherlands Antilles" },
  NC: { code: "+687", country: "New Caledonia" },
  NZ: { code: "+64", country: "New Zealand" },
  NI: { code: "+505", country: "Nicaragua" },
  NE: { code: "+227", country: "Niger" },
  NG: { code: "+234", country: "Nigeria" },
  NU: { code: "+683", country: "Niue" },
  KP: { code: "+850", country: "North Korea" },
  MP: { code: "+1-670", country: "Northern Mariana Islands" },
  NO: { code: "+47", country: "Norway" },
  OM: { code: "+968", country: "Oman" },
  PK: { code: "+92", country: "Pakistan" },
  PW: { code: "+680", country: "Palau" },
  PS: { code: "+970", country: "Palestine" },
  PA: { code: "+507", country: "Panama" },
  PG: { code: "+675", country: "Papua New Guinea" },
  PY: { code: "+595", country: "Paraguay" },
  PE: { code: "+51", country: "Peru" },
  PH: { code: "+63", country: "Philippines" },
  PN: { code: "+64", country: "Pitcairn" },
  PL: { code: "+48", country: "Poland" },
  PT: { code: "+351", country: "Portugal" },
  PR: { code: "+1-787", country: "Puerto Rico" },
  QA: { code: "+974", country: "Qatar" },
  CG: { code: "+242", country: "Republic of the Congo" },
  RE: { code: "+262", country: "Reunion" },
  RO: { code: "+40", country: "Romania" },
  RU: { code: "+7", country: "Russia" },
  RW: { code: "+250", country: "Rwanda" },
  BL: { code: "+590", country: "Saint Barthelemy" },
  SH: { code: "+290", country: "Saint Helena" },
  KN: { code: "+1-869", country: "Saint Kitts and Nevis" },
  LC: { code: "+1-758", country: "Saint Lucia" },
  MF: { code: "+590", country: "Saint Martin" },
  PM: { code: "+508", country: "Saint Pierre and Miquelon" },
  VC: { code: "+1-784", country: "Saint Vincent and the Grenadines" },
  WS: { code: "+685", country: "Samoa" },
  SM: { code: "+378", country: "San Marino" },
  ST: { code: "+239", country: "Sao Tome and Principe" },
  SA: { code: "+966", country: "Saudi Arabia" },
  SN: { code: "+221", country: "Senegal" },
  RS: { code: "+381", country: "Serbia" },
  SC: { code: "+248", country: "Seychelles" },
  SL: { code: "+232", country: "Sierra Leone" },
  SG: { code: "+65", country: "Singapore" },
  SX: { code: "+1-721", country: "Sint Maarten" },
  SK: { code: "+421", country: "Slovakia" },
  SI: { code: "+386", country: "Slovenia" },
  SB: { code: "+677", country: "Solomon Islands" },
  SO: { code: "+252", country: "Somalia" },
  ZA: { code: "+27", country: "South Africa" },
  KR: { code: "+82", country: "South Korea" },
  SS: { code: "+211", country: "South Sudan" },
  ES: { code: "+34", country: "Spain" },
  LK: { code: "+94", country: "Sri Lanka" },
  SD: { code: "+249", country: "Sudan" },
  SR: { code: "+597", country: "Suriname" },
  SZ: { code: "+268", country: "Swaziland" },
  SE: { code: "+46", country: "Sweden" },
  CH: { code: "+41", country: "Switzerland" },
  SY: { code: "+963", country: "Syria" },
  TW: { code: "+886", country: "Taiwan" },
  TJ: { code: "+992", country: "Tajikistan" },
  TZ: { code: "+255", country: "Tanzania" },
  TH: { code: "+66", country: "Thailand" },
  TG: { code: "+228", country: "Togo" },
  TK: { code: "+690", country: "Tokelau" },
  TO: { code: "+676", country: "Tonga" },
  TT: { code: "+1-868", country: "Trinidad and Tobago" },
  TN: { code: "+216", country: "Tunisia" },
  TR: { code: "+90", country: "Turkey" },
  TM: { code: "+993", country: "Turkmenistan" },
  TC: { code: "+1-649", country: "Turks and Caicos Islands" },
  TV: { code: "+688", country: "Tuvalu" },
  VI: { code: "+1-340", country: "U.S. Virgin Islands" },
  UG: { code: "+256", country: "Uganda" },
  UA: { code: "+380", country: "Ukraine" },
  AE: { code: "+971", country: "United Arab Emirates" },
  GB: { code: "+44", country: "United Kingdom" },
  US: { code: "+1", country: "United States" },
  UY: { code: "+598", country: "Uruguay" },
  UZ: { code: "+998", country: "Uzbekistan" },
  VU: { code: "+678", country: "Vanuatu" },
  VA: { code: "+379", country: "Vatican" },
  VE: { code: "+58", country: "Venezuela" },
  VN: { code: "+84", country: "Vietnam" },
  WF: { code: "+681", country: "Wallis and Futuna" },
  YE: { code: "+967", country: "Yemen" },
  ZM: { code: "+260", country: "Zambia" },
  ZW: { code: "+263", country: "Zimbabwe" },
};

type CountryCode = keyof typeof countryData;
type CustomLabels = {
  [key: string]: string;
};

type TSignupData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  address: string;
  country: CountryCode;
};
interface ErrorData {
  success: boolean;
  message: string;
}

const customLabels = Object.entries(countryData).reduce(
  (labels, [key, value]) => {
    labels[key] = `${value.code}`;
    return labels;
  },
  {} as CustomLabels
);

export default function SignupPage() {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>("US");
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignupData>();

  const handleRegisterForm: SubmitHandler<TSignupData> = async (data) => {
    try {
      // Construct phone number
      const phoneNumber = `${countryData[selectedCountry].code} ${data.phone}`;
      const signupData = { ...data, phone: phoneNumber };
      console.log(signupData);
      // Attempt to create the user
      const result = await createUser(signupData);
      if (result.error) {
        if ("data" in result.error) {
          const errorData = result.error.data as ErrorData; // Type assertion

          if (!errorData.success) {
            toast.error(errorData.message);
          }
        } else {
          // Handle other types of errors if needed
          toast.error("An unexpected error occurred.");
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error("Registration Failed");
    }
  };

  return (
    <div className="bg-[#E8E8E8] h-screen flex justify-center items-center">
      <form
        className="bg-white w-[600px] shadow-lg py-[30px] rounded-2xl flex justify-center items-center flex-col"
        onSubmit={handleSubmit(handleRegisterForm)}
      >
        <img className="w-16 mb-3" src={logo} alt="" />
        <h3 className="text-3xl font-medium mb-4 text-gray-700">MeetEase</h3>

        {/* Name Field */}
        <div className="flex flex-col w-4/5 md:w-3/5 mb-4">
          <label className="text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            className="outline-none border mt-1 p-2 rounded border-[#E8E8E8]"
            placeholder="Your name"
            type="text"
          />
          {errors.name && (
            <span className="text-red-600 text-sm mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className="flex flex-col w-4/5 md:w-3/5 mb-4">
          <label className="text-gray-700" htmlFor="email">
            Email address
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            className="outline-none border mt-1 p-2 rounded border-[#E8E8E8]"
            placeholder="Email address"
            type="email"
          />
          {errors.email && (
            <span className="text-red-600 text-sm mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col w-4/5 md:w-3/5 mb-4">
          <label className="text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            className="outline-none border mt-1 p-2 rounded border-[#E8E8E8]"
            placeholder="Password"
            type="password"
          />
          {errors.password && (
            <span className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col w-4/5 md:w-3/5 mb-4">
          <label className="text-gray-700" htmlFor="confirmPassword">
            Confirm password
          </label>
          <input
            {...register("confirmPassword", {
              required: "Confirm password is required",
              // validate: (value) =>
              //   value === watch("password") || "Passwords do not match",
            })}
            className="outline-none border mt-1 p-2 rounded border-[#E8E8E8]"
            placeholder="Confirm password"
            type="password"
          />
          {errors.confirmPassword && (
            <span className="text-red-600 text-sm mt-1">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Address Field */}
        <div className="flex flex-col w-4/5 md:w-3/5 mb-4">
          <label className="text-gray-700" htmlFor="address">
            Address
          </label>
          <input
            {...register("address", {
              required: "Address is required",
              // validate: (value) =>
              //   value === watch("password") || "Passwords do not match",
            })}
            className="outline-none border mt-1 p-2 rounded border-[#E8E8E8]"
            placeholder="Address"
            type="text"
          />
          {errors.address && (
            <span className="text-red-600 text-sm mt-1">
              {errors.address.message}
            </span>
          )}
        </div>

        {/* Number Field */}
        <div className="flex flex-col w-4/5 md:w-3/5 mb-4">
          <label className="text-gray-700" htmlFor="number">
            Phone
          </label>
          <div className="flex items-center gap-2">
            <div className="relative top-[2px]">
              <Controller
                name="country"
                control={control}
                defaultValue={selectedCountry}
                render={({ field }) => (
                  <ReactFlagsSelect
                    {...field}
                    selected={selectedCountry}
                    onSelect={(countryCode: CountryCode) => {
                      setSelectedCountry(countryCode);
                      field.onChange(countryCode);
                    }}
                    countries={Object.keys(countryData) as CountryCode[]}
                    customLabels={customLabels}
                    selectedSize={12}
                    alignOptionsToRight
                  />
                )}
              />
            </div>
            <input
              {...register("phone", {
                required: "Number is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Only numbers are allowed",
                },
              })}
              className="outline-none border mt-1 p-2 rounded border-[#E8E8E8] w-full"
              placeholder="Phone number"
              type="tel"
            />
          </div>
          {errors.phone && (
            <span className="text-red-600 text-sm mt-1">
              {errors.phone.message}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="bg-rose-500 hover:bg-rose-600 transition duration-200 text-white py-[10px] px-12 rounded-xl font-bold mt-2"
        >
          Sign Up
        </button>
        <p className="text-[#b5b4b4] mt-3 md:mt-4">
          Already have an account?{" "}
          <Link
            to={`/login`}
            className="hover:cursor-pointer hover:underline hover:text-[#959595]"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
