import type { MedicalComplaint } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// Master catalog for the "Add New Complaint" popover.
// These are NOT patient-specific records — they are suggestion seeds that get
// turned into a real EXISTING/NEW complaint when the doctor picks one.
// Each entry carries a `region` tag so the RegionChips filter can work.
// ─────────────────────────────────────────────────────────────────────────────

export const COMPLAINT_CATALOG: MedicalComplaint[] = [
  // ── Spine ──────────────────────────────────────────────────────────────────
  { id: "CAT_S01", title: "Cervical Spondylosis",          isActive: true, type: "EXISTING", region: "Spine" },
  { id: "CAT_S02", title: "Lumbar Disc Herniation (L4–L5)", isActive: true, type: "EXISTING", region: "Spine" },
  { id: "CAT_S03", title: "Chronic Lower Back Pain",        isActive: true, type: "EXISTING", region: "Spine" },
  { id: "CAT_S04", title: "Lumbar Spondylosis",             isActive: true, type: "EXISTING", region: "Spine" },
  { id: "CAT_S05", title: "Sciatica",                       isActive: true, type: "EXISTING", region: "Spine" },
  { id: "CAT_S06", title: "Thoracic Outlet Syndrome",       isActive: true, type: "EXISTING", region: "Spine" },
  { id: "CAT_S07", title: "Spondylolisthesis",              isActive: true, type: "EXISTING", region: "Spine" },
  { id: "CAT_S08", title: "Spinal Stenosis",                isActive: true, type: "EXISTING", region: "Spine" },

  // ── Shoulder ───────────────────────────────────────────────────────────────
  { id: "CAT_SH01", title: "Frozen Shoulder (Adhesive Capsulitis)", isActive: true, type: "EXISTING", region: "Shoulder" },
  { id: "CAT_SH02", title: "Rotator Cuff Tear",             isActive: true, type: "EXISTING", region: "Shoulder" },
  { id: "CAT_SH03", title: "Shoulder Impingement Syndrome", isActive: true, type: "EXISTING", region: "Shoulder" },
  { id: "CAT_SH04", title: "AC Joint Sprain",               isActive: true, type: "EXISTING", region: "Shoulder" },
  { id: "CAT_SH05", title: "Biceps Tendinopathy",           isActive: true, type: "EXISTING", region: "Shoulder" },

  // ── Knee ───────────────────────────────────────────────────────────────────
  { id: "CAT_K01", title: "Post-Op ACL Reconstruction Rehab", isActive: true, type: "EXISTING", region: "Knee" },
  { id: "CAT_K02", title: "Patellofemoral Pain Syndrome",   isActive: true, type: "EXISTING", region: "Knee" },
  { id: "CAT_K03", title: "Meniscus Tear",                  isActive: true, type: "EXISTING", region: "Knee" },
  { id: "CAT_K04", title: "Osteoarthritis – Knee",          isActive: true, type: "EXISTING", region: "Knee" },
  { id: "CAT_K05", title: "IT Band Syndrome",               isActive: true, type: "EXISTING", region: "Knee" },
  { id: "CAT_K06", title: "Patellar Tendinopathy",          isActive: true, type: "EXISTING", region: "Knee" },

  // ── Hip ────────────────────────────────────────────────────────────────────
  { id: "CAT_H01", title: "Hip Osteoarthritis",             isActive: true, type: "EXISTING", region: "Hip" },
  { id: "CAT_H02", title: "Hip Bursitis (Trochanteric)",    isActive: true, type: "EXISTING", region: "Hip" },
  { id: "CAT_H03", title: "Groin Strain",                   isActive: true, type: "EXISTING", region: "Hip" },
  { id: "CAT_H04", title: "Piriformis Syndrome",            isActive: true, type: "EXISTING", region: "Hip" },
  { id: "CAT_H05", title: "Hip Labral Tear",                isActive: true, type: "EXISTING", region: "Hip" },

  // ── Elbow / Wrist / Hand ───────────────────────────────────────────────────
  { id: "CAT_E01", title: "Tennis Elbow (Lateral Epicondylitis)",  isActive: true, type: "EXISTING", region: "Elbow" },
  { id: "CAT_E02", title: "Golfer's Elbow (Medial Epicondylitis)", isActive: true, type: "EXISTING", region: "Elbow" },
  { id: "CAT_E03", title: "Carpal Tunnel Syndrome",         isActive: true, type: "EXISTING", region: "Elbow" },
  { id: "CAT_E04", title: "De Quervain's Tenosynovitis",    isActive: true, type: "EXISTING", region: "Elbow" },
  { id: "CAT_E05", title: "Wrist Sprain",                   isActive: true, type: "EXISTING", region: "Elbow" },

  // ── Ankle / Foot ───────────────────────────────────────────────────────────
  { id: "CAT_A01", title: "Ankle Sprain (Lateral)",         isActive: true, type: "EXISTING", region: "Ankle" },
  { id: "CAT_A02", title: "Plantar Fasciitis",              isActive: true, type: "EXISTING", region: "Ankle" },
  { id: "CAT_A03", title: "Achilles Tendinopathy",          isActive: true, type: "EXISTING", region: "Ankle" },
  { id: "CAT_A04", title: "Post-Op Ankle Fracture Rehab",   isActive: true, type: "EXISTING", region: "Ankle" },
  { id: "CAT_A05", title: "Tibialis Posterior Tendinopathy",isActive: true, type: "EXISTING", region: "Ankle" },

  // ── Neuro / Head ──────────────────────────────────────────────────────────
  { id: "CAT_N01", title: "Migraine (Cervicogenic)",        isActive: true, type: "EXISTING", region: "Neuro" },
  { id: "CAT_N02", title: "Bell's Palsy",                   isActive: true, type: "EXISTING", region: "Neuro" },
  { id: "CAT_N03", title: "Stroke Rehabilitation",          isActive: true, type: "EXISTING", region: "Neuro" },
  { id: "CAT_N04", title: "Peripheral Neuropathy",          isActive: true, type: "EXISTING", region: "Neuro" },
  { id: "CAT_N05", title: "Parkinson's Disease – Physio",   isActive: true, type: "EXISTING", region: "Neuro" },
];

// Derive unique regions from the catalog for the chips list.
// We define the order explicitly so "All" is always first and the rest are
// sorted consistently — avoids relying on insertion order of a Set.
export const CATALOG_REGIONS = [
  "All",
  "Spine",
  "Shoulder",
  "Knee",
  "Hip",
  "Elbow",
  "Ankle",
  "Neuro",
] as const;

export type CatalogRegion = (typeof CATALOG_REGIONS)[number];
