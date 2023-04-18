import { Box, Button, Step, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import { Toaster, toast } from "react-hot-toast";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { v4 as uuid } from "uuid";
export default function refId() {
  const router = useRouter();
  const ref = router.query.refId;
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);
  const [accCreateData, setAccCreateData] = useState({ panNo: "" });
  const [panData, setPanData] = useState();
  const [ckycData, setCkycData] = useState();
  const [accData, setAccData] = useState();
  const [accValData, setAccValData] = useState();
  const [step, setStep] = useState(0);
  let [validation, setValidation] = useState({
    panVal: false,
    fullNameVal: false,
    pnVal: false,
    uidVal: false,
    ckycVal: false,
    ckycCreVal: false,
    accOpVal: false,
  });
  let [prog, setProg] = useState({
    progress1: true,
    progress2: true,
    progress3: true,
    progress4: true,
    progress5: true,
    progress6: true,
    progress7: true,
  });
  const [commonData, setCommonData] = useState();

  const collectionAccCreate = query(
    collection(db, "account-create"),
    where("ref", "==", String(ref))
  );

  const collectionCkycdb = query(
    collection(db, "ckyc-db"),
    where("ref", "==", String(ref))
  );

  const collectionAcc = query(
    collection(db, "accounts"),
    where("ref", "==", String(ref))
  );

  const collectionAccVal = query(
    collection(db, "account-validation"),
    where("ref", "==", String(ref))
  );
  const collectionPan =
    accCreateData.panNo &&
    query(collection(db, "pan-db"), where("panNo", "==", accCreateData.panNo));

  const collectionFullName =
    accCreateData.fullName &&
    query(
      collection(db, "account-create"),
      where("fullName", "==", accCreateData.fullName)
    );

  const collectionPanNo =
    accCreateData.panNo &&
    query(
      collection(db, "account-create"),
      where("panNo", "==", accCreateData.panNo)
    );

  const collectionUID =
    accCreateData.UID &&
    query(
      collection(db, "account-create"),
      where("UID", "==", accCreateData.UID)
    );

  const collectionCkyc = collection(db, "ckyc-db");
  const collectionAccounts = collection(db, "accounts");
  const collectionAccountVal = collection(db, "account-validation");

  console.log(accCreateData, panData);

  const getCustomerDetails = async () => {
    const randomNumber = Math.random() * 100000000000; // generate a random number
    const uniqueId = parseInt(randomNumber);
    await getDocs(collectionAccCreate)
      .then((res) => {
        const data = res.docs.map((item) => {
          return {
            ...item.data(),
            CIF: `1${uniqueId}`,
          };
        });
        setAccCreateData(data[0]);
        setStep(1);
      })

      .catch((err) => console.log(err));
  };

  const getPanDetail = async () => {
    await getDocs(collectionPan)
      .then((res) => {
        const data = res.docs.map((item) => {
          return {
            ...item.data(),
          };
        });
        setPanData(...data);
        return data;
      })
      .then((data) => {
        console.log(data.panNo, accCreateData.panNo);
        if (data[0].panNo == accCreateData.panNo) {
          setValidation((prevData) => {
            return {
              ...prevData,
              panVal: true,
            };
          });
          setStep(2);
          prog["progress1"] = false;
        } else {
          toast.error("Pan validation failed");
        }
      })
      .catch((err) => console.log(err));
  };

  const getCkycDetail = async () => {
    await getDocs(collectionCkycdb)
      .then((res) => {
        const data = res.docs.map((item) => {
          return {
            ...item.data(),
          };
        });
        setCkycData(data);
        return data;
      })
      .catch((err) => console.log(err));
  };

  const getAccountDetail = async () => {
    await getDocs(collectionAcc)
      .then((res) => {
        const data = res.docs.map((item) => {
          return {
            ...item.data(),
          };
        });
        setAccData(data);
        return data;
      })
      .catch((err) => console.log(err));
  };

  const getAccValDetails = async () => {
    await getDocs(collectionAccVal)
      .then((res) => {
        const data = res.docs.map((item) => {
          return {
            ...item.data(),
          };
        });
        setAccValData(data);
      })

      .catch((err) => console.log(err));
  };

  const commonGet = async (collectionName, text, textFail, vali, num) => {
    await getDocs(collectionName)
      .then((res) => {
        const data = res.docs.map((item) => {
          return {
            ...item.data(),
          };
        });
        setCommonData(...data);
        console.log(data, "FERR");
        return data;
      })
      .then((data) => {
        console.log("D", num, data.panNo, accCreateData.panNo);
        if (data.length < 2) {
          vali === "fm"
            ? ((validation["fullNameVal"] = true), setStep(3))
            : vali === "pn"
            ? ((validation["pnVal"] = true), setStep(4))
            : vali === "uid"
            ? ((validation["uidVal"] = true), setStep(5))
            : vali === "ckyc"
            ? ((validation["ckycVal"] = true), setStep(6))
            : (validation["ckycCreVal"] = true);
        } else {
          toast.error(textFail);
          setStep(num);
        }
      })
      .catch((err) => console.log(err));
  };

  const ckycCreation = () => {
    const ckycDatainput = {
      CIF: accCreateData.CIF,
      fatherFullNameCkyc: accCreateData.fatherFullNameCkyc,
      motherFullNameCkyc: accCreateData.motherFullNameCkyc,
      kycDoc: accCreateData.kycDoc,
      ckycState: accCreateData.ckycState,
      ckycCountry: accCreateData.ckycCountry,
      addressType: accCreateData.addressType,
      addressProof: accCreateData.addressProof,
      address: accCreateData.address,
      ckycPinCode: accCreateData.ckycPinCode,
      ref: accCreateData.ref,
    };
    if (ckycData.length === 0) {
      addDoc(collectionCkyc, ckycDatainput)
        .then((res) => {
          validation["ckycCreVal"] = true;
          setStep(7);
          toast.success("Created CKYC");
        })
        .catch((err) => console.log(err));
    } else {
      validation["ckycCreVal"] = true;
      setStep(7);
    }
  };

  const accCreation = () => {
    const randomNumber = Math.random() * 1000000000000; // generate a random number
    const uniqueId = parseInt(randomNumber);
    const acxcDatainput = {
      accId: `1${uniqueId}`,
      ...accCreateData,
    };
    if (
      accData.length === 0 &&
      validation.panVal &&
      validation.fullNameVal &&
      validation.pnVal &&
      validation.uidVal &&
      validation.ckycVal &&
      validation.ckycCreVal
    ) {
      console.log(accData);
      addDoc(collectionAccounts, acxcDatainput)
        .then((res) => {
          validation["accOpVal"] = true;
          setStep(8);
          toast.success("Created Account");
        })
        .catch((err) => console.log(err));
    } else {
      validation["accOpVal"] = true;
      setStep(8);
    }
  };

  const accValidation = () => {
    const accValidationData = {
      CIF: accCreateData.CIF,
      ref,
      panValidation: validation.panVal ? "S" : "F",
      InstantAccDedupeOnName: validation.fullNameVal ? "S" : "F",
      InstantAccDedupeOnPAN: validation.pnVal ? "S" : "F",
      InstantAccDedupeOnID: validation.uidVal ? "S" : "F",
      InstantAccCKYCSearch: validation.ckycVal ? "S" : "F",
      InstantAccCKYCCreation: validation.ckycCreVal ? "S" : "F",
      InstantAccountOpen: validation.accOpVal ? "S" : "F",
    };
    if (
      accValData.length === 0 &&
      validation.panVal &&
      validation.fullNameVal &&
      validation.pnVal &&
      validation.uidVal &&
      validation.ckycVal &&
      validation.ckycCreVal &&
      validation.accOpVal
    ) {
      console.log(accValData);
      addDoc(collectionAccountVal, accValidationData)
        .then((res) => {})
        .catch((err) => console.log(err));
    } else {
    }
  };

  const onSubmitVal = () => {
    router.push(`/DepositAmount/${accCreateData.CIF}`);
  };

  useEffect(() => {
    getCustomerDetails();
    getCkycDetail();
    getAccountDetail();
    getAccValDetails();
  }, [ref]);

  useEffect(() => {
    if (step === 1) {
      getPanDetail();
    } else if (step === 2) {
      commonGet(
        collectionFullName,
        "AccDedupeOnName successful",
        "AccDedupeOnName failed",
        "fm",
        3
      );
      prog["progress2"] = false;
    } else if (step === 3) {
      commonGet(
        collectionPanNo,
        "AccDedupeOnPAN successful",
        "AccDedupeOnPAN failed",
        "pn",
        4
      );
      prog["progress3"] = false;
    } else if (step === 4) {
      commonGet(
        collectionUID,
        "AccDedupeOnID successful",
        "AccDedupeOnID failed",
        "uid",
        5
      );
      prog["progress4"] = false;
    } else if (step === 5) {
      commonGet(
        collectionUID,
        "AccCKYCSearch successful",
        "AccCKYCSearch failed",
        "ckyc",
        6
      );
      prog["progress5"] = false;
    } else if (step === 6) {
      ckycCreation();
      prog["progress6"] = false;
    } else if (step === 7) {
      accCreation();
      prog["progress7"] = false;
    } else if (step === 8) {
      accValidation();
    }
  }, [step, ref]);
  return (
    <Box sx={{ mt: "40px" }}>
      <Toaster position="top-center" reverseOrder={true} />
      <Box
        sx={{
          mt: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          p: "20px",
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: "40px" }}>
          Please wait we are validating your data
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {prog.progress1 ? (
            <CgSpinner size={20} className="mt-1 animate-spin" />
          ) : validation.panVal ? (
            <CheckCircleOutlineIcon sx={{ color: "green" }} />
          ) : (
            <CancelIcon sx={{ color: "red" }} />
          )}
          <Typography variant="body1" sx={{ p: "20px" }}>
            Pan validation
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {prog.progress2 ? (
            <CgSpinner size={20} className="mt-1 animate-spin" />
          ) : validation.fullNameVal ? (
            <CheckCircleOutlineIcon sx={{ color: "green" }} />
          ) : (
            <CancelIcon sx={{ color: "red" }} />
          )}
          <Typography variant="body1" sx={{ p: "20px" }}>
            Instant Acc Dedupe On Name
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {prog.progress3 ? (
            <CgSpinner size={20} className="mt-1 animate-spin" />
          ) : validation.pnVal ? (
            <CheckCircleOutlineIcon sx={{ color: "green" }} />
          ) : (
            <CancelIcon sx={{ color: "red" }} />
          )}
          <Typography variant="body1" sx={{ p: "20px" }}>
            Instant Acc Dedupe On PAN
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {prog.progress4 ? (
            <CgSpinner size={20} className="mt-1 animate-spin" />
          ) : validation.uidVal ? (
            <CheckCircleOutlineIcon sx={{ color: "green" }} />
          ) : (
            <CancelIcon sx={{ color: "red" }} />
          )}
          <Typography variant="body1" sx={{ p: "20px" }}>
            Instant Acc Dedupe On ID
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {prog.progress5 ? (
            <CgSpinner size={20} className="mt-1 animate-spin" />
          ) : validation.ckycVal ? (
            <CheckCircleOutlineIcon sx={{ color: "green" }} />
          ) : (
            <CancelIcon sx={{ color: "red" }} />
          )}
          <Typography variant="body1" sx={{ p: "20px" }}>
            Instant Acc CKYC Search
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {prog.progress6 ? (
            <CgSpinner size={20} className="mt-1 animate-spin" />
          ) : validation.ckycCreVal ? (
            <CheckCircleOutlineIcon sx={{ color: "green" }} />
          ) : (
            <CancelIcon sx={{ color: "red" }} />
          )}
          <Typography variant="body1" sx={{ p: "20px" }}>
            Instant Acc CKYC Creation
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {prog.progress7 ? (
            <CgSpinner size={20} className="mt-1 animate-spin" />
          ) : validation.accOpVal ? (
            <CheckCircleOutlineIcon sx={{ color: "green" }} />
          ) : (
            <CancelIcon sx={{ color: "red" }} />
          )}
          <Typography variant="body1" sx={{ p: "20px" }}>
            Instant Account Open
          </Typography>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        {step === 8 && (
          <Button
            disabled={
              !validation.panVal ||
              !validation.fullNameVal ||
              !validation.pnVal ||
              !validation.uidVal ||
              !validation.ckycVal ||
              !validation.ckycCreVal ||
              !validation.accOpVal
            }
            variant="contained"
            onClick={onSubmitVal}
            sx={{
              backgroundColor: "#2A3A8D",
              color: "#fff",
              p: "10px 20px",
              mt: "20px",
            }}
          >
            Proceed
          </Button>
        )}
      </Box>
    </Box>
  );
}
