import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import SettingsIcon from "@mui/icons-material/Settings";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HouseIcon from "@mui/icons-material/House";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import DescriptionIcon from "@mui/icons-material/Description";
import CampaignIcon from "@mui/icons-material/Campaign";
import ErrorIcon from "@mui/icons-material/Error";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import GroupIcon from "@mui/icons-material/Group";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import EngineeringIcon from "@mui/icons-material/Engineering";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import EmailIcon from "@mui/icons-material/Email";
import SmsIcon from "@mui/icons-material/Sms";
import RuleIcon from "@mui/icons-material/Rule";
import CalculateIcon from "@mui/icons-material/Calculate";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DvrIcon from "@mui/icons-material/Dvr";
import AddHomeIcon from "@mui/icons-material/AddHome";
import { useNavigate } from "react-router-dom";

export default function NestedList() {
  const [open, setOpen] = React.useState({});

  const navigate = useNavigate();

  const handleClick = (key) => {
    if (key === "addHousingInformation") {
      navigate("/add-housing-information");
    } else {
      setOpen((prevOpen) => ({ ...prevOpen, [key]: !prevOpen[key] }));
    }
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Nested List Items
        </ListSubheader>
      }
    >
      <ListItemButton onClick={() => handleClick("housingManagement")}>
        <ListItemIcon>
          <ApartmentIcon />
        </ListItemIcon>
        <ListItemText primary="Konut Yönetimi" />
        {open.housingManagement ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.housingManagement} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={() => handleClick("addHousingInformation")}
          >
            <ListItemIcon>
              <AddHomeIcon />
            </ListItemIcon>
            <ListItemText primary="Konut Bilgisi Ekle" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("sitesApartments")}>
        <ListItemIcon>
          <LocationCityIcon />
        </ListItemIcon>
        <ListItemText primary="Siteler(Apartman)" />
        {open.sitesApartments ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.sitesApartments} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("sitesHouses")}>
        <ListItemIcon>
          <HouseIcon />
        </ListItemIcon>
        <ListItemText primary="Siteler(Müstakil)" />
        {open.sitesHouses ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.sitesHouses} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("houses")}>
        <ListItemIcon>
          <NightShelterIcon />
        </ListItemIcon>
        <ListItemText primary="Daireler" />
        {open.houses ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.houses} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("dues")}>
        <ListItemIcon>
          <ReceiptLongIcon />
        </ListItemIcon>
        <ListItemText primary="Aidatlar" />
        {open.dues ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.dues} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("rents")}>
        <ListItemIcon>
          <FamilyRestroomIcon />
        </ListItemIcon>
        <ListItemText primary="Kiralar" />
        {open.rents ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.rents} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("debts")}>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Borçlar" />
        {open.debts ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.debts} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("announcements")}>
        <ListItemIcon>
          <CampaignIcon />
        </ListItemIcon>
        <ListItemText primary="Duyurular" />
        {open.announcements ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.announcements} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("complaints")}>
        <ListItemIcon>
          <ErrorIcon />
        </ListItemIcon>
        <ListItemText primary="Şikayetler" />
        {open.complaints ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.complaints} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("requestsAndSuggestions")}>
        <ListItemIcon>
          <HelpCenterIcon />
        </ListItemIcon>
        <ListItemText primary="İstek ve Öneriler" />
        {open.requestsAndSuggestions ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.requestsAndSuggestions} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("servicesAndCompanies")}>
        <ListItemIcon>
          <SupportAgentIcon />
        </ListItemIcon>
        <ListItemText primary="Hizmetler-Firmalar" />
        {open.servicesAndCompanies ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.servicesAndCompanies} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("users")}>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Kullanıcılar" />
        {open.users ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.users} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("notes")}>
        <ListItemIcon>
          <SpeakerNotesIcon />
        </ListItemIcon>
        <ListItemText primary="Notlar" />
        {open.notes ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.notes} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("employees")}>
        <ListItemIcon>
          <EngineeringIcon />
        </ListItemIcon>
        <ListItemText primary="Çalışanlar" />
        {open.employees ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.employees} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("expenses")}>
        <ListItemIcon>
          <ShoppingCartCheckoutIcon />
        </ListItemIcon>
        <ListItemText primary="Giderler" />
        {open.expenses ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.expenses} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("sendMail")}>
        <ListItemIcon>
          <EmailIcon />
        </ListItemIcon>
        <ListItemText primary="Mail Gönder" />
        {open.sendMail ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.sendMail} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("sendSMS")}>
        <ListItemIcon>
          <SmsIcon />
        </ListItemIcon>
        <ListItemText primary="SMS Gönder" />
        {open.sendSMS ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.sendSMS} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("rules")}>
        <ListItemIcon>
          <RuleIcon />
        </ListItemIcon>
        <ListItemText primary="Kurallar" />
        {open.rules ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.rules} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("calculator")}>
        <ListItemIcon>
          <CalculateIcon />
        </ListItemIcon>
        <ListItemText primary="Hesap Makinesi" />
        {open.calculator ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.calculator} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("profile")}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profil" />
        {open.profile ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.profile} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("logRecords")}>
        <ListItemIcon>
          <DvrIcon />
        </ListItemIcon>
        <ListItemText primary="Log Kayıtları" />
        {open.logRecords ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.logRecords} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={() => handleClick("settings")}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Ayarlar" />
        {open.settings ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open.settings} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
