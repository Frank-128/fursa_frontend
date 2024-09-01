"use client";
import { useEffect, useState } from "react";
import {
    Input,
    Select,
    Option,
    Stepper,
    Step,
    Button,
} from "@material-tailwind/react";
import FileUpload from "../../../../components/drag_n_drop_component/DragNDrop";
import {
    Controller,
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import api from "@/axiosInstance";
import { globalStore } from "@/context/store";
import { useMutation, useQuery } from "@tanstack/react-query";

interface ExtendedFile extends File {
    preview: string;
}

interface CustomFields extends FieldValues {
    owner: {
        fullname: string;
        email: string;
        phonenumber: string;
        alt_phonenumber?: string;
    };
}

export default function AddProject() {
    const [projectMap, setProjectMap] = useState<ExtendedFile[]>([]);
    const [projectPictures, setProjectPictures] = useState<ExtendedFile[]>([]);
    const [projectCoordinates, setProjectCoordinates] = useState<
        ExtendedFile[]
    >([]);
    const [contract, setContract] = useState<ExtendedFile[]>([]);
    const [townplan, setTownplan] = useState<ExtendedFile[]>([]);
    const [searchFromMinistry, setSearchFromMinistry] = useState<
        ExtendedFile[]
    >([]);
    const [activeStep, setActiveStep] = useState(0);
    const [regions, setRegions] = useState<[] | null>(null);
    const [districts, setDistricts] = useState<[] | null>(null);
    const [wards, setWards] = useState<[] | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<
        string | undefined
    >("");
    const [selectedRegion, setSelectedRegion] = useState<string | undefined>(
        ""
    );
    const [projectType, setProjectType] = useState<string>("");
    const [ownership, setOwnership] = useState<
        { mandate: string; ownership_type: string } | undefined
    >({
        mandate: "",
        ownership_type: "",
    });

    const token = globalStore((state) => state.token);
    const user = globalStore((state) => state.user);

    const {
        register,
        handleSubmit,
        setValue,
        control,
        clearErrors,
        trigger,
        formState: { errors },
    } = useForm<CustomFields>();

    const postData = async (data: FieldValues) => {

      const response = await api.post("project/", data, {
            headers: {
              "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    };

    const mutation = useMutation({
        mutationFn: postData,
        onSuccess: (data) => {
            alert("project created");
        },
        onError: (error) => {
            console.error("Error:", error);
        },
    });

    const submitData: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
        const formData = new FormData();
        const {
            region,
            broker,
            owner,
            first_neighbour,
            second_neighbour,
            third_neighbour,
            fourth_neighbour,
            ...rest
        } = data;

        Object.entries(rest).forEach(([key, value]) => {
            formData.append(key, value);
        });

        Object.entries(broker).forEach(([key, value]) => {
            formData.append("broker." + key, value as string);
        });

        Object.entries(owner).forEach(([key, value]) => {
            formData.append("owner." + key, value as string);
        });

        Object.entries(first_neighbour).forEach(([key, value]) => {
            formData.append("first_neighbour." + key, value as string);
        });

        Object.entries(second_neighbour).forEach(([key, value]) => {
            formData.append("second_neighbour." + key, value as string);
        });

        Object.entries(third_neighbour).forEach(([key, value]) => {
            formData.append("third_neighbour." + key, value as string);
        });

        Object.entries(fourth_neighbour).forEach(([key, value]) => {
            formData.append("fourth_neighbour." + key, value as string);
        });

        formData.append("townplan", townplan[0]);

        projectPictures.forEach((file, index) => {
            formData.append(`project_images`, file);
            formData.append(`project_images[0]project_image`, file, file.name);
            formData.append(`project_images[1]project_image`, file, file.name);
        });

        projectCoordinates.forEach((file) => {
            formData.append("project_coordinates", file, file.name);
        });

        contract.forEach((file) => {
            formData.append("contract", file, file.name);
        });

        projectMap.forEach((file) => {
            formData.append("project_map", file, file.name);
        });

        searchFromMinistry.forEach((file) => {
            formData.append("official_search", file, file.name);
        });
        formData.append('added_by',user?.id.toString() as string)
        
        

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

    const { data, error, isLoading } = useQuery({
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

    const getWards = async () => {
        const { data } = await api.get("address/district/" + selectedDistrict, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return data;
    };

    const {
        data: wardData,
        error: wardError,
        isLoading: wardIsLoading,
    } = useQuery({
        queryKey: ["getWards", selectedDistrict],
        queryFn: getWards,
    });

    useEffect(() => {
        if (data && data.length > 0) {
            setSelectedRegion(data[0].id);
        }
    }, [data]);

    useEffect(() => {
        if (districtData && districtData.length > 0) {
            setSelectedDistrict(districtData[0].id);
        }
    }, [districtData]);

    const sectionDetails = [
        {
            step: 1,
            fields: [
                "name",
                "size",
                "project_type",
                "broker_price",
                "selling_price",
                "ward",
                "division",
                "district",
                "region",
                "street",
            ],
        },
        {
            step: 2,
            fields: ["cash_price", "installment_price", "flat_rate_price"],
        },
    ];

    const handleNext = async () => {
        if (activeStep === 0) {
            const isStepOneValid = await trigger(sectionDetails[0].fields);
            if (isStepOneValid) {
                setActiveStep(activeStep + 1);
            }
        } else if (activeStep === 1 || activeStep === 2 || activeStep === 3) {
            setActiveStep(activeStep + 1);
        }
    };

    

    return (
        <form
            onSubmit={handleSubmit(submitData)}
            className={
                "flex flex-col gap-y-4 items-center justify-center w-full pb-10 "
            }
        >
            <div
                className={"text-center  text-2xl text-[#17225a] font-bold p-2"}
            >
                Add new Project
            </div>
            <Stepper activeStep={activeStep}>
                <Step onClick={() => setActiveStep(0)}>1</Step>
                <Step onClick={() => setActiveStep(1)}>2</Step>
                <Step onClick={() => setActiveStep(2)}>3</Step>
                <Step onClick={() => setActiveStep(3)}>4</Step>
                <Step onClick={() => setActiveStep(4)}>5</Step>
            </Stepper>
            <div className="mt-16 flex justify-between w-full">
                <Button
                    onClick={() => setActiveStep(activeStep - 1)}
                    disabled={activeStep === 0}
                >
                    Prev
                </Button>
                <Button onClick={handleNext} disabled={activeStep > 3}>
                    Next
                </Button>
            </div>

            {activeStep === 0 && (
                <>
                    {/* Project Details */}
                    <div className={"w-full"}>
                        Project Details
                        <div
                            className={
                                "p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20"
                            }
                        >
                            <div
                                className={
                                    "grid grid-cols-1 gap-4 md:grid-cols-2 flex-col"
                                }
                            >
                                <div className="w-full">
                                    <Input
                                        {...register("name", {
                                            required:
                                                "Project name should be provided",
                                            onChange: () => clearErrors("name"),
                                        })}
                                        label={"Project Name"}
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-red-500">
                                            {errors.name &&
                                            typeof errors?.name.message ===
                                                "string"
                                                ? errors.name.message
                                                : "Error occurred"}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Input
                                        {...register("size", {
                                            required:
                                                "Project size should be provided",
                                            onChange: () => clearErrors("size"),
                                        })}
                                        label={"Size in ㎡"}
                                        type="number"
                                    />
                                    {errors.size && (
                                        <p className="text-xs text-red-500">
                                            {errors.size &&
                                            typeof errors?.size.message ===
                                                "string"
                                                ? errors.size.message
                                                : "Error occurred"}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Controller
                                        name="project_type"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required:
                                                "Project type is required",
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                onChange={(e) => {
                                                    setValue("project_type", e);
                                                    clearErrors("project_type");
                                                }}
                                                label={"project type"}
                                            >
                                                <Option value="Residential">
                                                    Residential
                                                </Option>
                                                <Option value="Residential and Commercial">
                                                    Residential and commercial
                                                </Option>
                                                <Option value="Industrial">
                                                    Industrial
                                                </Option>
                                                <Option value="Public utilities">
                                                    Public utilities
                                                </Option>
                                                <Option value="Open space">
                                                    Open space
                                                </Option>
                                                <Option value="Utilities">
                                                    Utilities
                                                </Option>
                                            </Select>
                                        )}
                                    />
                                    {errors.project_type && (
                                        <p className="text-xs text-red-500">
                                            {errors.project_type &&
                                            typeof errors?.project_type
                                                .message === "string"
                                                ? errors.project_type.message
                                                : "Error occurred"}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Input
                                        {...register("broker_price", {
                                            required:
                                                "Broker price is required",
                                            onChange: () =>
                                                clearErrors("broker_price"),
                                        })}
                                        label={"Indicative Price(from broker)"}
                                        type={"number"}
                                    />
                                    {errors.broker_price && (
                                        <p className="text-xs text-red-500">
                                            {errors.broker_price &&
                                            typeof errors?.broker_price
                                                .message === "string"
                                                ? errors.broker_price.message
                                                : "Error occurred"}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Input
                                        {...register("selling_price", {
                                            required:
                                                "Selling price is required",
                                            onChange: () =>
                                                clearErrors("selling_price"),
                                        })}
                                        label={"Selling price"}
                                    />
                                    {errors.selling_price && (
                                        <p className="text-xs text-red-500">
                                            {errors.selling_price &&
                                            typeof errors?.selling_price
                                                .message === "string"
                                                ? errors.selling_price.message
                                                : "Error occurred"}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={"flex w-full justify-center"}>
                                <FileUpload
                                    title={"Agreement contract"}
                                    files={contract}
                                    setFiles={setContract}
                                    fileType={"pdf"}
                                />
                            </div>
                        </div>
                    </div>

                    {/*  Project location  */}
                    <div className={"w-full"}>
                        Project Location
                        <div
                            className={
                                "p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20"
                            }
                        >
                            <div className={"flex gap-4 md:flex-row flex-col"}>
                                {!isLoading && (
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
                                                    {data?.map(
                                                        (
                                                            item: {
                                                                id: number;
                                                                name: string;
                                                            },
                                                            index: number
                                                        ) => (
                                                            <Option
                                                                className="font-helvetica"
                                                                value={item.id.toString()}
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
                                                            .message ===
                                                            "string"
                                                            ? errors.region
                                                                  .message
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
                                                            .message ===
                                                            "string"
                                                            ? errors.district
                                                                  .message
                                                            : "Error occurred"}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    />
                                )}
                            </div>

                            <div className={"flex gap-4 md:flex-row flex-col"}>
                                <div className="w-full">
                                    <Input
                                        {...register("division", {
                                            required: "Division is required",
                                            onChange: () => {
                                                clearErrors("division");
                                            },
                                        })}
                                        label={"Division"}
                                    />
                                    {errors.division && (
                                        <p className="text-xs text-red-500">
                                            {errors.division &&
                                            typeof errors?.division.message ===
                                                "string"
                                                ? errors.division.message
                                                : "Error occurred"}
                                        </p>
                                    )}
                                </div>
                                <div className="w-full">
                                    <Input
                                        {...register("ward", {
                                            required: "Ward is required",
                                            onChange: () => {
                                                clearErrors("ward");
                                            },
                                        })}
                                        label={"Ward"}
                                    />
                                    {errors.ward && (
                                        <p className="text-xs text-red-500">
                                            {errors.ward &&
                                            typeof errors?.ward.message ===
                                                "string"
                                                ? errors.ward.message
                                                : "Error occurred"}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className={"flex gap-4 md:flex-row flex-col"}>
                                <div className="w-full">
                                    <Input
                                        {...register("street", {
                                            required: "Street is required",
                                            onChange: () => {
                                                clearErrors("street");
                                            },
                                        })}
                                        label={"Street"}
                                    />
                                    {errors.street && (
                                        <p className="text-xs text-red-500">
                                            {errors.street &&
                                            typeof errors?.street.message ===
                                                "string"
                                                ? errors.street.message
                                                : "Error occurred"}
                                        </p>
                                    )}
                                </div>
                                <Input className={"hidden"} />
                            </div>
                        </div>
                    </div>
                </>
            )}
            {activeStep === 1 && (
                <>
                    {/*  Map and coordinates   */}

                    <div className={"w-full"}>
                        Project Map and coordinates
                        <div
                            className={
                                "p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20"
                            }
                        >
                            <div className={"flex gap-4  flex-col"}>
                                <FileUpload
                                    title={"map"}
                                    files={projectMap}
                                    setFiles={setProjectMap}
                                />
                                {/* 
                                ***
                                to be implemented
                                ***
                                */}
                                {/* { (fileError && projectMap.length === 0) && <span className="text-xs text-red-500">Project map is required</span>} */}
                                <FileUpload
                                    title={"project picture"}
                                    files={projectPictures}
                                    setFiles={setProjectPictures}
                                />
                                {/* ***
                                to be implemented
                                ***
                                */}
                                {/* { (fileError && projectMap.length === 0) && <span className="text-xs text-red-500">Project Picture is required</span>} */}
                                <FileUpload
                                    title={"project coordinates"}
                                    files={projectCoordinates}
                                    setFiles={setProjectCoordinates}
                                    fileType={"pdf"}
                                />
                                {/* 
                                
                                ***
                                to be implemented
                                ***
                                

                                */}
                                {/* { (fileError && projectMap.length === 0) && <span className="text-xs text-red-500">Project Coordinates is required</span>} */}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {activeStep === 2 && (
                <>
                    {/* Owner's details */}
                    <div className={"w-full"}>
                        Owner Details
                        <div
                            className={
                                "p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20"
                            }
                        >
                            <div className={"flex gap-4 md:flex-row flex-col"}>
                                <div className="w-full">
                                    <Input
                                        label={"Full Name"}
                                        {...register("owner.fullname", {
                                            required:
                                                "Owner full name is required",
                                            onChange: () => {
                                                clearErrors("owner.fullname");
                                            },
                                        })}
                                    />
                                    {errors.owner?.fullname && (
                                        <p className="text-xs text-red-500">
                                            {typeof errors.owner.fullname
                                                .message === "string"
                                                ? errors.owner.fullname.message
                                                : "Error occurred"}
                                        </p>
                                    )}
                                </div>
                                <div className="w-full">
                                    <Input
                                        label={"Email"}
                                        {...register("owner.email", {
                                            required: "Owner email is required",
                                            onChange: () => {
                                                clearErrors("owner.email");
                                            },
                                        })}
                                    />
                                    {errors.owner?.email && (
                                        <p className="text-xs text-red-500">
                                            {typeof errors.owner.email
                                                .message === "string"
                                                ? errors.owner.email.message
                                                : "Error occurred"}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className={"flex gap-4 md:flex-row flex-col"}>
                                <div className="w-full">
                                    <Input
                                        label={"Phone"}
                                        {...register("owner.phonenumber", {
                                            required:
                                                "Owner Phonenumber is required",
                                            onChange: () => {
                                                clearErrors("division");
                                            },
                                        })}
                                    />
                                    {errors.owner?.phonenumber && (
                                        <p className="text-xs text-red-500">
                                            {typeof errors.owner.phonenumber
                                                .message === "string"
                                                ? errors.owner.phonenumber
                                                      .message
                                                : "Error occurred"}
                                        </p>
                                    )}
                                </div>
                                <Input
                                    {...register("owner.alt_phonenumber")}
                                    label={"Alternative Phone(opt)"}
                                />
                            </div>
                            <div className={"flex gap-4 md:flex-row flex-col"}>
                                <Select
                                    onChange={(e) =>
                                        setValue("owner_identification_type", e)
                                    }
                                    label={"Identifaction type"}
                                >
                                    <Option value="Driver licence">
                                        Driver licence
                                    </Option>
                                    <Option value="Voter Card">
                                        Voter Card
                                    </Option>
                                    <Option value="NIDA">NIDA</Option>
                                    <Option value="Passport">Passport</Option>
                                </Select>
                                <div className="w-full">
                                    <Input
                                        label={"Identification No"}
                                        {...register(
                                            "owner_identification_no",
                                            {
                                                required:
                                                    "Owner Identificattion number is required",
                                                onChange: () => {
                                                    clearErrors(
                                                        "owner_dentification_no"
                                                    );
                                                },
                                            }
                                        )}
                                    />
                                    {errors.owner_identification_no && (
                                        <p className="text-xs text-red-500">
                                            {typeof errors
                                                .owner_identification_no
                                                .message === "string"
                                                ? errors.owner_identification_no
                                                      .message
                                                : "Error occurred"}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={"flex gap-4 md:flex-row flex-col"}>
                                <div className="w-full">
                                    <Input
                                        label={"TIN"}
                                        {...register("TIN", {
                                            required: "TIN is required",
                                            onChange: () => {
                                                clearErrors("TIN");
                                            },
                                        })}
                                    />
                                    {errors.TIN && (
                                        <p className="text-xs text-red-500">
                                            {typeof errors.TIN.message ===
                                            "string"
                                                ? errors.TIN.message
                                                : "Error occurred"}
                                        </p>
                                    )}
                                </div>
                                <Input label={"BRELA"} {...register("BRELA")} />
                            </div>

                            <div className={"flex gap-4 md:flex-row flex-col"}>
                                <Select
                                    onChange={(e) => setValue("mandate", e)}
                                    label={
                                        "Mandate on behalf of corporate body"
                                    }
                                >
                                    <Option value="1">Yes</Option>
                                    <Option value="0">No</Option>
                                </Select>
                                <Select
                                    onChange={(e) =>
                                        setValue("ownership_type", e)
                                    }
                                    label={"Ownership type"}
                                >
                                    <Option value="Sole ownership">
                                        Sole ownership
                                    </Option>
                                    <Option value="Family">Family</Option>
                                    <Option value="Company">Company</Option>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/*  Supervisor/Broker's Information  */}
                    <div className={"w-full"}>
                        Broker/Supervisor Details
                        <div
                            className={
                                "p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20"
                            }
                        >
                            <div className={"flex gap-4 md:flex-row flex-col"}>
                                <Input
                                    {...register("broker.fullname")}
                                    label={"Full Name"}
                                />
                                <Input
                                    {...register("broker.email")}
                                    label={"Email"}
                                />
                            </div>
                            <div className={"flex gap-4 md:flex-row flex-col"}>
                                <Input
                                    {...register("broker.phonenumber")}
                                    label={"Phone"}
                                />
                                <Input
                                    {...register("broker.alt_phonenumber")}
                                    label={"Alternative Phone(opt)"}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {activeStep === 3 && (
                <>
                    {/*  Neighbours Information  */}
                    <div className={"w-full"}>
                        First Neighbour Details
                        <div
                            className={
                                "p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20"
                            }
                        >
                            <div className={"flex gap-4 md:flex-row flex-col"}>
                                <Input
                                    {...register("first_neighbour.fullname")}
                                    label={"Full Name"}
                                />
                                <Input
                                    {...register("first_neighbour.email")}
                                    label={"Email"}
                                />
                            </div>
                            <div className={"flex gap-4 md:flex-row flex-col"}>
                                <Input
                                    {...register("first_neighbour.phonenumber")}
                                    label={"Phone"}
                                />
                                <Input
                                    {...register(
                                        "first_neighbour.alt_phonenumber"
                                    )}
                                    label={"Alternative Phone(opt)"}
                                />
                            </div>
                        </div>
                    </div>

                    {/*  2nd neighbour Information  */}
                    <div className={"w-full"}>
                        Second Neighbour Details(opt)
                        <div
                            className={
                                "p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20"
                            }
                        >
                            <div className={"flex gap-4 md:flex-row flex-col"}>
                                <Input
                                    {...register("second_neighbour.fullname")}
                                    label={"Full Name"}
                                />
                                <Input
                                    {...register("second_neighbour.email")}
                                    label={"Email"}
                                />
                            </div>
                            <div className={"flex gap-4 md:flex-row flex-col"}>
                                <Input
                                    {...register(
                                        "second_neighbour.phonenumber"
                                    )}
                                    label={"Phone"}
                                />
                                <Input
                                    {...register(
                                        "second_neighbour.alt_phonenumber"
                                    )}
                                    label={"Alternative Phone(opt)"}
                                />
                            </div>
                        </div>
                    </div>

                    {/*  3rd neighbour Information  */}
                    <div className={"w-full"}>
                        Third Neighbour Details(opt)
                        <div
                            className={
                                "p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20"
                            }
                        >
                            <div className={"flex gap-4 md:flex-row flex-col"}>
                                <Input
                                    {...register("third_neighbour.fullname")}
                                    label={"Full Name"}
                                />
                                <Input
                                    {...register("third_neighbour.email")}
                                    label={"Email"}
                                />
                            </div>
                            <div className={"flex gap-4 md:flex-row flex-col"}>
                                <Input
                                    {...register("third_neighbour.phonenumber")}
                                    label={"Phone"}
                                />
                                <Input
                                    {...register(
                                        "third_neighbour.alt_phonenumber"
                                    )}
                                    label={"Alternative Phone(opt)"}
                                />
                            </div>
                        </div>
                    </div>

                    {/*  Neighbouring features  */}
                    <div className={"w-full"}>
                        Neighbouring Features
                        <div
                            className={
                                "p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20"
                            }
                        >
                            <div className={"flex gap-4 md:flex-row flex-col"}>
                                <Input
                                    {...register("fourth_neighbour.fullname")}
                                    label={"Full Name"}
                                />
                                <Input
                                    {...register("fourth_neighbour.email")}
                                    label={"Email"}
                                />
                            </div>
                            <div className={"flex gap-4 md:flex-row flex-col"}>
                                <Input
                                    {...register(
                                        "fourth_neighbour.phonenumber"
                                    )}
                                    label={"Phone"}
                                />
                                <Input
                                    {...register(
                                        "fourth_neighbour.alt_phonenumber"
                                    )}
                                    label={"Alternative Phone(opt)"}
                                />
                            </div>
                        </div>
                    </div>
                </>
            )}

            {activeStep === 4 && (
                <>
                    {/*  Plot details   */}
                    <div className={"w-full"}>
                        Townplan and Official search
                        <div
                            className={
                                "p-2 border-[0.8px] border-gray-600 grid md:grid-cols-2 grid-cols-1 gap-2 shadow-md rounded-sm shadow-blue-800/20"
                            }
                        >
                            <div className="w-full">
                                <Input
                                    {...register("number_of_plots", {
                                        required: "Number of plots is required",
                                        onChange: () =>
                                            clearErrors("number_of_plots"),
                                    })}
                                    label={"Number of plots"}
                                    type={"number"}
                                />
                                {errors.number_of_plots && (
                                    <p className="text-xs text-red-500">
                                        {errors.number_of_plots &&
                                        typeof errors?.number_of_plots
                                            .message === "string"
                                            ? errors.number_of_plots.message
                                            : "Error occurred"}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <Input
                                    {...register("cash_price", {
                                        required: "Plot cash price is required",
                                        onChange: () =>
                                            clearErrors("cash_price"),
                                    })}
                                    label={"Plot cash price"}
                                    type={"number"}
                                />
                                {errors.cash_price && (
                                    <p className="text-xs text-red-500">
                                        {errors.cash_price &&
                                        typeof errors?.cash_price.message ===
                                            "string"
                                            ? errors.cash_price.message
                                            : "Error occurred"}
                                    </p>
                                )}
                            </div>
                            <div className="w-full">
                                <Input
                                    {...register("installment_price", {
                                        required:
                                            "Plot Installment price is required",
                                        onChange: () =>
                                            clearErrors("installment_price"),
                                    })}
                                    label={"Plot Installment price"}
                                    type={"number"}
                                />
                                {errors.installment_price && (
                                    <p className="text-xs text-red-500">
                                        {errors.installment_price &&
                                        typeof errors?.installment_price
                                            .message === "string"
                                            ? errors.installment_price.message
                                            : "Error occurred"}
                                    </p>
                                )}
                            </div>

                            <div className="w-full">
                                <Input
                                    {...register("flat_rate_price", {
                                        required: "Flat rate is required",
                                        onChange: () =>
                                            clearErrors("flat_rate_price"),
                                    })}
                                    label={"Plot Flat rate price"}
                                    type={"number"}
                                />
                                {errors.flat_rate_price && (
                                    <p className="text-xs text-red-500">
                                        {errors.flat_rate_price &&
                                        typeof errors?.flat_rate_price
                                            .message === "string"
                                            ? errors.flat_rate_price.message
                                            : "Error occurred"}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className={"w-full"}>
                        Townplan and Official search
                        <div
                            className={
                                "p-2 border-[0.8px] border-gray-600 space-y-4 shadow-md rounded-sm shadow-blue-800/20"
                            }
                        >
                            <div className={"flex gap-4 md:flex-row flex-col"}>
                                <FileUpload
                                    title={"town plan"}
                                    files={townplan}
                                    setFiles={setTownplan}
                                />
                                <FileUpload
                                    title={"official search"}
                                    files={searchFromMinistry}
                                    setFiles={setSearchFromMinistry}
                                    fileType={"pdf"}
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full  justify-center flex">
                            <button className="p-2 rounded w-1/2 bg-blue-900 text-white">
                                Add project
                            </button>
                        </div>
                    </div>
                </>
            )}
        </form>
    );
}
