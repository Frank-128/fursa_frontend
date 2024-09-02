"use client";
import {
    Checkbox,
    Input,
    Option,
    Radio,
    Select,
} from "@material-tailwind/react";
import React, { useState, useRef, useEffect } from "react";
import FileUpload from "@/components/drag_n_drop_component/DragNDrop";
import { roles } from "@/constants/roles";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { globalStore } from "@/context/store";
import {
    Controller,
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/axiosInstance";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ExtendedFile extends File {
    preview: string;
}

export default function CreateStaff() {
    const route = useRouter();

    const [nida, setNida] = useState<ExtendedFile[]>([]);
    const [applicationLetter, setApplicationLetter] = useState<ExtendedFile[]>(
        []
    );
    const [profile, setProfile] = useState<ExtendedFile[]>([]);
    const [contract, setContract] = useState<ExtendedFile[]>([]);
    const [localGvt, setLocalGvt] = useState<ExtendedFile[]>([]);
    const [roles, setRoles] = useState<string[]>([]);
    const [selectedDistrict, setSelectedDistrict] = useState<
        string | undefined
    >("");
    const [selectedRegion, setSelectedRegion] = useState<string | undefined>(
        ""
    );
    const token = globalStore((state) => state.token);
    const stepperRef = useRef<any>(null);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm();

    const handleRole = (val: string) => {
        setRoles((prev) => {
            if (prev.includes(val)) {
                return prev.filter((item) => item !== val);
            }
            return [...prev, val];
        });
    };

    const postData = async (data: FieldValues) => {
        const response = await axios.post(
            "http://localhost:8000/user/staff/",
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    };

    const mutation = useMutation({
        mutationFn: postData,
        onSuccess: (data) => {
            alert("user created");
            route.push("/staff");
        },
        onError: (error) => {
            console.error("Error:", error);
        },
    });

    const getRoles = async () => {
        const { data } = await api.get("user/roles", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    };

    const { data, error, isLoading } = useQuery({
        queryKey: ["getRoles"],
        queryFn: getRoles,
        refetchOnWindowFocus: true,
    });

    const submitData: SubmitHandler<FieldValues> = (data) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]: [string, string]) => {
            formData.append(key, value);
        });

        profile.forEach((file) => {
            formData.append("profile_image", file, file.name);
        });

        // formData.append('profile_picture',profile[0])

        nida.forEach((file) => {
            formData.append("NIDA_COPY", file, file.name);
        });

        applicationLetter.forEach((file) => {
            formData.append("application_letter", file, file.name);
        });

        contract.forEach((file) => {
            formData.append("contract", file, file.name);
        });

        localGvt.forEach((file) => {
            formData.append("local_government_document", file, file.name);
        });

        applicationLetter.forEach((file) => {
            formData.append("application_letter", file, file.name);
        });

        roles.forEach((role) => {
            formData.append("groups_data", role);
        });

        formData.append("password", data.last_name.toUpperCase() + "1234");

        mutation.mutate(formData);
    };

    const getRegions = async () => {
        const { data } = await api.get("address/regions", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return data;
    };

    const {
        data: regionData,
        error: regionError,
        isLoading: regionIsLoading,
    } = useQuery({
        queryKey: ["getRegions"],
        queryFn: getRegions,
    });

    const getDistricts = async () => {
        const { data } = await api.get("address/region/" + selectedRegion, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return data;
    };

    const {
        data: districtData,
        error: districtError,
        isLoading: districtIsLoading,
    } = useQuery({
        queryKey: ["getDistricts", selectedRegion],
        queryFn: getDistricts,
    });

    useEffect(() => {
        if (regionData && regionData.length > 0) {
            setSelectedRegion(regionData[0].id);
        }
    }, [regionData]);

    useEffect(() => {
        if (districtData && districtData.length > 0) {
            setSelectedDistrict(districtData[0].id);
        }
    }, [districtData]);

    return (
        <form
            onSubmit={handleSubmit(submitData)}
            className={"flex flex-col gap-4 py-5"}
        >
            <div
                className={"flex justify-center text-3xl text-gray-900 w-full"}
            >
                Add new staff
            </div>
            <Stepper ref={stepperRef} linear>
                <StepperPanel header="basic details">
                    <div className="flex my-4 justify-end">
                        <Button
                            className="bg-[#17255a] text-[#ff8427] p-2 gap-1 text-xs cursor-pointer"
                            label="Next"
                            icon={<FaArrowRight />}
                            iconPos="right"
                            onClick={() => stepperRef?.current?.nextCallback()}
                        />
                    </div>
                    <div
                        className={
                            "flex flex-col items-center w-full gap-y-6  gap-4 p-2  border-[0.9px] border-gray-500 "
                        }
                    >
                        <div
                            className={
                                "w-full grid md:grid-cols-2 grid-cols-1 gap-4  justify-between"
                            }
                        >
                            <Input
                                {...register("first_name")}
                                label={"First name"}
                            />
                            <Input
                                {...register("middle_name")}
                                label={"Middle name"}
                            />
                        </div>
                        <div
                            className={
                                "w-full grid md:grid-cols-2 grid-cols-1 gap-4  justify-between"
                            }
                        >
                            <Input
                                {...register("last_name")}
                                label={"Surname"}
                            />
                            <Input
                                {...register("date_of_birth")}
                                label={"Date of birth"}
                                type={"date"}
                                className={"w-full"}
                            />
                            <Input
                                {...register("date_joined")}
                                label={"Date Joined"}
                                type={"date"}
                                className={"w-full"}
                            />
                            <div
                                className={
                                    "flex justify-start items-start flex-col"
                                }
                            >
                                <div>Gender</div>
                                <div className={"flex"}>
                                    <Radio
                                        id="male"
                                        value={"male"}
                                        {...register("gender")}
                                        label="Male"
                                    />
                                    <Radio
                                        id="female"
                                        value={"female"}
                                        {...register("gender")}
                                        label="Female"
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            className={
                                "w-full grid md:grid-cols-2 grid-cols-1 gap-4  "
                            }
                        >
                            <Input
                                {...register("NIDA")}
                                label={"NIDA Number"}
                            />

                            <FileUpload
                                title={"Nida copy"}
                                files={nida}
                                setFiles={setNida}
                            />

                            <FileUpload
                                title={"Profile Picture"}
                                files={profile}
                                setFiles={setProfile}
                            />
                        </div>
                    </div>
                </StepperPanel>
                <StepperPanel header="contact details">
                    <div className="flex justify-between items-center my-4">
                        <div className="flex  justify-start">
                            <Button
                                className="bg-[#17255a] text-[#ff8427] p-2 gap-1 text-xs cursor-pointer"
                                label="Previous"
                                icon={<FaArrowLeft />}
                                iconPos="left"
                                onClick={() =>
                                    stepperRef?.current?.prevCallback()
                                }
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                className="bg-[#17255a] text-[#ff8427] p-2 gap-1 text-xs cursor-pointer"
                                label="Next"
                                icon={<FaArrowRight />}
                                iconPos="right"
                                onClick={() =>
                                    stepperRef?.current?.nextCallback()
                                }
                            />
                        </div>
                    </div>
                    <div className={"flex justify-start  w-full"}>
                        Personal Contacts Details
                    </div>
                    <div className="space-y-3">
                        <div
                            className={
                                "w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 "
                            }
                        >
                            <Input
                                {...register("phonenumber")}
                                label={"Mobile Phone"}
                                className={"w-full"}
                            />
                            <Input
                                {...register("alt_phonenumber")}
                                label={"Second Mobile Phone"}
                                className={"w-full"}
                            />
                            <Input
                                {...register("email")}
                                label={"Email address"}
                                type={"email"}
                                className={"w-full"}
                            />
                        </div>

                        <div className={"flex justify-start  w-full"}>
                            Referral Details
                        </div>
                        <div
                            className={
                                "w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 "
                            }
                        >
                            <Input
                                {...register("referral_name")}
                                label={"Referral Name"}
                                className={"w-full"}
                            />
                            <Input
                                {...register("referral_contacts")}
                                label={"Referral Contacts"}
                                className={"w-full"}
                            />
                            <Input
                                {...register("guarantor_name")}
                                label={"Guarantor Name"}
                                className={"w-full"}
                            />
                            <Input
                                {...register("guarantor_contacts")}
                                label={"Guarantor Contacts"}
                                className={"w-full"}
                            />
                            <Input
                                {...register("emergency_contact_name")}
                                label={"Emergency Contact Name"}
                                className={"w-full"}
                            />
                            <Input
                                {...register("emergency_contact_phonenumber")}
                                label={"Emergency Contact Phonenumber"}
                                className={"w-full"}
                            />
                            <Controller
                                name="next_of_kin"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: "Next of kin is required",
                                }}
                                render={({ field }) => (
                                    <div className="w-full">
                                        <Select
                                            onChange={(e) => {
                                                setValue("next_of_kin", e);
                                                clearErrors("next_of_kin");
                                            }}
                                            label={"Next of Kin"}
                                        >
                                            {[
                                                "Father",
                                                "Mother",
                                                "Sister",
                                                "Brother",
                                                "Uncle",
                                                "Aunt",
                                                "Other",
                                            ].map((item, index: number) => (
                                                <Option
                                                    className="font-helvetica"
                                                    key={index}
                                                    value={item}
                                                >
                                                    {item}
                                                </Option>
                                            ))}
                                        </Select>
                                        {errors.next_of_kin && (
                                            <p className="text-xs text-red-500">
                                                {errors.next_of_kin &&
                                                typeof errors?.next_of_kin
                                                    .message === "string"
                                                    ? errors.next_of_kin.message
                                                    : "Error occurred"}
                                            </p>
                                        )}
                                    </div>
                                )}
                            />
                            <Input
                                {...register("next_of_kin_phonenumber")}
                                label={"Next Of Kin Phonenumber"}
                                className={"w-full"}
                            />
                            <FileUpload
                                title={"Guarantor Letter"}
                                files={nida}
                                setFiles={setNida}
                            />
                        </div>
                        <div className={"flex justify-start  w-full"}>
                            Social Media Handles
                        </div>
                        <div
                            className={
                                "w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 "
                            }
                        >
                            <Input
                                {...register("instagram")}
                                label={"Instagram"}
                                className={"w-full"}
                            />
                            <Input
                                {...register("facebook")}
                                label={"Facebook"}
                                className={"w-full"}
                            />
                            <Input
                                {...register("twitter")}
                                label={"Twitter"}
                                className={"w-full"}
                            />
                            <Input
                                {...register("others")}
                                label={"Others(specify)"}
                                className={"w-full"}
                            />
                        </div>
                    </div>
                </StepperPanel>
                <StepperPanel header="bank details">
                    <div className="flex justify-between items-center my-4">
                        <div className="flex  justify-start">
                            <Button
                                className="bg-[#17255a] text-[#ff8427] p-2 gap-1 text-xs cursor-pointer"
                                label="Previous"
                                icon={<FaArrowLeft />}
                                iconPos="left"
                                onClick={() =>
                                    stepperRef?.current?.prevCallback()
                                }
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                className="bg-[#17255a] text-[#ff8427] p-2 gap-1 text-xs cursor-pointer"
                                label="Next"
                                icon={<FaArrowRight />}
                                iconPos="right"
                                onClick={() =>
                                    stepperRef?.current?.nextCallback()
                                }
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className={"flex justify-start  w-full"}>
                            Bank Details
                        </div>
                        <div
                            className={
                                "w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 "
                            }
                        >
                            <Input
                                {...register("bank_name")}
                                label={"Bank Name"}
                                className={"w-full"}
                            />
                            <Input
                                {...register("bank_branch")}
                                label={"Bank Branch"}
                                className={"w-full"}
                            />
                            <Input
                                {...register("bank_card_number")}
                                label={"Account Number"}
                                className={"w-full"}
                            />
                        </div>
                        <div
                            className={
                                "w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 "
                            }
                        >
                            <div>
                                <div>NSSF Status</div>
                                <div className={"flex"}>
                                    <Radio
                                        id="yes"
                                        value={1}
                                        name="nssf"
                                        label="Yes"
                                        defaultChecked
                                    />
                                    <Radio
                                        id="no"
                                        value={0}
                                        name="nssf"
                                        label="No"
                                    />
                                </div>
                            </div>
                            <Input
                                {...register("nssf_no")}
                                label={"Nssf Membership No"}
                                className={"w-full"}
                            />
                            <FileUpload
                                title={"NSSF copy"}
                                files={nida}
                                setFiles={setNida}
                            />
                        </div>
                        <div
                            className={
                                "w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 "
                            }
                        >
                            <div>
                                <div>TIN</div>
                                <div className={"flex"}>
                                    <Radio
                                        id="yes"
                                        value={1}
                                        name="tin"
                                        label="Yes"
                                        defaultChecked
                                    />
                                    <Radio
                                        id="no"
                                        value={0}
                                        name="tin"
                                        label="No"
                                    />
                                </div>
                            </div>
                            <Input
                                {...register("TIN")}
                                label={"TIN No"}
                                className={"w-full"}
                            />
                            <FileUpload
                                title={"TIN copy"}
                                files={nida}
                                setFiles={setNida}
                            />
                        </div>
                        <div></div>
                    </div>
                </StepperPanel>
                <StepperPanel header="address and medical">
                    <div className="flex justify-between items-center my-4">
                        <div className="flex  justify-start">
                            <Button
                                className="bg-[#17255a] text-[#ff8427] p-2 gap-1 text-xs cursor-pointer"
                                label="Previous"
                                icon={<FaArrowLeft />}
                                iconPos="left"
                                onClick={() =>
                                    stepperRef?.current?.prevCallback()
                                }
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                className="bg-[#17255a] text-[#ff8427] p-2 gap-1 text-xs cursor-pointer"
                                label="Next"
                                icon={<FaArrowRight />}
                                iconPos="right"
                                onClick={() =>
                                    stepperRef?.current?.nextCallback()
                                }
                            />
                        </div>
                    </div>
                    <h1>Address and Medical Condition</h1>
                    <div className="space-y-4">
                        <div
                            className={
                                "w-full grid md:grid-cols-2 grid-cols-1 gap-4 p-2  border-[0.9px] border-gray-500 "
                            }
                        >
                            {!regionIsLoading && (
                                <Controller
                                    name="region"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: "Region is required",
                                    }}
                                    render={({ field }) => (
                                        <div className="w-full">
                                            <Select
                                                onChange={(e) => {
                                                    setValue("region", e);
                                                    setSelectedRegion(e);
                                                    clearErrors("region");
                                                }}
                                                label={"Region"}
                                            >
                                                {regionData?.map(
                                                    (
                                                        item: {
                                                            id: number;
                                                            name: string;
                                                        },
                                                        index: number
                                                    ) => (
                                                        <Option
                                                            className="font-helvetica"
                                                            value={item?.id.toString()}
                                                            key={index}
                                                        >
                                                            {item.name}
                                                        </Option>
                                                    )
                                                )}
                                            </Select>
                                            {errors.region && (
                                                <p className="text-xs text-red-500">
                                                    {errors.region &&
                                                    typeof errors?.region
                                                        .message === "string"
                                                        ? errors.region.message
                                                        : "Error occurred"}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            )}

                            {districtData?.length > 0 && (
                                <Controller
                                    name="district"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: "District is required",
                                    }}
                                    render={({ field }) => (
                                        <div className="w-full">
                                            <Select
                                                onChange={(e) => {
                                                    setValue("district", e);
                                                    clearErrors("district");
                                                }}
                                                label={"District"}
                                            >
                                                {districtData?.map(
                                                    (
                                                        {
                                                            name,
                                                            id,
                                                        }: {
                                                            name: string;
                                                            id: number;
                                                        },
                                                        index: number
                                                    ) => (
                                                        <Option
                                                            className="font-helvetica"
                                                            key={index}
                                                            value={id.toString()}
                                                        >
                                                            {name}
                                                        </Option>
                                                    )
                                                )}
                                            </Select>
                                            {errors.district && (
                                                <p className="text-xs text-red-500">
                                                    {errors.district &&
                                                    typeof errors?.district
                                                        .message === "string"
                                                        ? errors.district
                                                              .message
                                                        : "Error occurred"}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            )}
                            <Input
                                {...register("subtown")}
                                label={"Subtown"}
                                className={"w-full"}
                            />
                            <Input
                                {...register("ward")}
                                label={"Ward"}
                                className={"w-full"}
                            />
                            <Input
                                {...register("street")}
                                label={"Street"}
                                className={"w-full"}
                            />
                            <Input
                                {...register("postal_address")}
                                label={"Postal Address"}
                                className={"w-full"}
                            />
                        </div>

                        <div className={"flex justify-start  w-full"}>
                            Medical Conditions
                        </div>
                        <div
                            className={
                                "grid grid-cols-1 md:grid-cols-2 gap-2 p-2  border-[0.9px] border-gray-500"
                            }
                        >
                            <Input
                                {...register("medical_condition")}
                                label={"Medical Condition"}
                                className={"w-full"}
                            />
                            <FileUpload
                                title={"Medical Condition"}
                                files={contract}
                                setFiles={setContract}
                                fileType="pdf"
                            />
                        </div>
                    </div>
                </StepperPanel>
                <StepperPanel header="contract">
                    <div className=''>
                    <div className="flex justify-between items-center my-4">
                        <div className="flex  justify-start">
                            <Button
                                className="bg-[#17255a] text-[#ff8427] p-2 gap-1 text-xs cursor-pointer"
                                label="Previous"
                                icon={<FaArrowLeft />}
                                iconPos="left"
                                onClick={() =>
                                    stepperRef?.current?.prevCallback()
                                }
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                className="bg-[#17255a] text-[#ff8427] p-2 gap-1 text-xs cursor-pointer"
                                label="Next"
                                icon={<FaArrowRight />}
                                iconPos="right"
                                onClick={() =>
                                    stepperRef?.current?.nextCallback()
                                }
                            />
                        </div>
                    </div>
                    <div className={"flex my-4 justify-start  w-full"}>
                        Contract Details
                    </div>
                    <div className="border-[0.9px] border-gray-500">
                        <div
                            className={
                                "grid md:grid-cols-2 gap-2 p-2 grid-cols-1"
                            }
                        >
                            <Input
                                {...register("gross_salary")}
                                label={"Gross Salary"}
                                className={"w-full"}
                            />
                            <Input
                                {...register("length_of_contract")}
                                type="number"
                                label={"Length of contract"}
                                className={"w-full"}
                            />
                            <div className="">
                                <div className={"flex justify-start  w-full"}>
                                    Is Internal Employee?
                                </div>
                                <div className={"flex"}>
                                    <Radio
                                        id="no"
                                        value={0}
                                        {...register("is_internal_employee")}
                                        label="NO"
                                    />
                                    <Radio
                                        id="yes"
                                        value={1}
                                        {...register("is_internal_employee")}
                                        label="YES"
                                        defaultChecked
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"flex justify-start my-2 w-full"}>
                        Attachments
                    </div>
                    <div
                        className={
                            "flex justify-start flex-col w-full gap-2 p-2  border-[0.9px] border-gray-500"
                        }
                    >
                        <FileUpload
                            title={"Contract"}
                            files={contract}
                            setFiles={setContract}
                            fileType="pdf"
                        />
                        <FileUpload
                            title={"Local Government Documents"}
                            files={localGvt}
                            setFiles={setLocalGvt}
                            fileType="pdf"
                        />
                        <FileUpload
                            title={"Application Letter"}
                            files={applicationLetter}
                            setFiles={setApplicationLetter}
                            fileType="pdf"
                        />
                    </div>
                    <div className={"flex justify-start my-2 w-full"}>
                        Assign roles
                    </div>
                    <div
                        className={
                            "flex justify-start flex-col w-full gap-2 p-2  border-[0.9px] border-gray-500"
                        }
                    >
                        {data?.map(
                            (
                                item: { name: string; permissions: {}[] },
                                index: number
                            ) => (
                                <div key={index}>
                                    <Checkbox
                                        label={item.name}
                                        onChange={() => handleRole(item.name)}
                                        color={"green"}
                                    />
                                </div>
                            )
                        )}
                    </div>
                    <button className="p-2   bg-[#17225a] w-full rounded-md my-2 shadow-lg shadow-blue-800/20 text-white">
                        Add new staff
                    </button>
                    </div>
                </StepperPanel>
            </Stepper>
        </form>
    );
}
