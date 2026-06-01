import { describe, it, expect } from 'vitest';
import {
  shouldChargeService,
  calculateServiceCharge,
  calculateConsultationFee,
} from '../patientUtils';

describe('Billing Utilities', () => {
  describe('shouldChargeService', () => {
    it('should always charge PREMIUM services regardless of visit type', () => {
      expect(shouldChargeService('PREMIUM', 'CONSULTATION')).toBe(true);
      expect(shouldChargeService('PREMIUM', 'MACHINE_ONLY')).toBe(true);
    });

    it('should not charge STANDARD services in CONSULTATION visits', () => {
      expect(shouldChargeService('STANDARD', 'CONSULTATION')).toBe(false);
    });

    it('should charge STANDARD services in MACHINE_ONLY visits', () => {
      expect(shouldChargeService('STANDARD', 'MACHINE_ONLY')).toBe(true);
    });
  });

  describe('calculateServiceCharge', () => {
    it('should return full price for PREMIUM services in CONSULTATION', () => {
      expect(calculateServiceCharge(500, 'PREMIUM', 'CONSULTATION')).toBe(500);
    });

    it('should return full price for PREMIUM services in MACHINE_ONLY', () => {
      expect(calculateServiceCharge(500, 'PREMIUM', 'MACHINE_ONLY')).toBe(500);
    });

    it('should return 0 for STANDARD services in CONSULTATION', () => {
      expect(calculateServiceCharge(150, 'STANDARD', 'CONSULTATION')).toBe(0);
    });

    it('should return full price for STANDARD services in MACHINE_ONLY', () => {
      expect(calculateServiceCharge(150, 'STANDARD', 'MACHINE_ONLY')).toBe(150);
    });

    it('should handle zero price correctly', () => {
      expect(calculateServiceCharge(0, 'STANDARD', 'MACHINE_ONLY')).toBe(0);
      expect(calculateServiceCharge(0, 'PREMIUM', 'CONSULTATION')).toBe(0);
    });

    it('should handle large prices correctly', () => {
      expect(calculateServiceCharge(10000, 'PREMIUM', 'CONSULTATION')).toBe(10000);
      expect(calculateServiceCharge(10000, 'STANDARD', 'MACHINE_ONLY')).toBe(10000);
    });
  });

  describe('calculateConsultationFee', () => {
    it('should return 300 for FIRST consultation', () => {
      expect(calculateConsultationFee('CONSULTATION', 'FIRST')).toBe(300);
    });

    it('should return 200 for SUBSEQUENT consultation', () => {
      expect(calculateConsultationFee('CONSULTATION', 'SUBSEQUENT')).toBe(200);
    });

    it('should return 0 for MACHINE_ONLY visits', () => {
      expect(calculateConsultationFee('MACHINE_ONLY')).toBe(0);
      expect(calculateConsultationFee('MACHINE_ONLY', 'FIRST')).toBe(0);
      expect(calculateConsultationFee('MACHINE_ONLY', 'SUBSEQUENT')).toBe(0);
    });

    it('should default to 200 when consultationType is undefined for CONSULTATION', () => {
      // When consultationType is undefined, the function returns 200 (SUBSEQUENT price)
      expect(calculateConsultationFee('CONSULTATION', undefined)).toBe(200);
    });
  });

  describe('Billing Integration Scenarios', () => {
    it('should calculate correct total for CONSULTATION with STANDARD services', () => {
      // Scenario: First consultation with IFT (STANDARD, ₹150) and TENS (STANDARD, ₹100)
      const consultationFee = calculateConsultationFee('CONSULTATION', 'FIRST');
      const iftCharge = calculateServiceCharge(150, 'STANDARD', 'CONSULTATION');
      const tensCharge = calculateServiceCharge(100, 'STANDARD', 'CONSULTATION');
      const total = consultationFee + iftCharge + tensCharge;

      expect(consultationFee).toBe(300);
      expect(iftCharge).toBe(0); // STANDARD services are free in CONSULTATION
      expect(tensCharge).toBe(0);
      expect(total).toBe(300); // Only consultation fee
    });

    it('should calculate correct total for CONSULTATION with PREMIUM services', () => {
      // Scenario: Subsequent consultation with Cupping (PREMIUM, ₹500)
      const consultationFee = calculateConsultationFee('CONSULTATION', 'SUBSEQUENT');
      const cuppingCharge = calculateServiceCharge(500, 'PREMIUM', 'CONSULTATION');
      const total = consultationFee + cuppingCharge;

      expect(consultationFee).toBe(200);
      expect(cuppingCharge).toBe(500); // PREMIUM services are always charged
      expect(total).toBe(700);
    });

    it('should calculate correct total for MACHINE_ONLY with STANDARD services', () => {
      // Scenario: Machine-only visit with IFT (STANDARD, ₹150) and TENS (STANDARD, ₹100)
      const consultationFee = calculateConsultationFee('MACHINE_ONLY');
      const iftCharge = calculateServiceCharge(150, 'STANDARD', 'MACHINE_ONLY');
      const tensCharge = calculateServiceCharge(100, 'STANDARD', 'MACHINE_ONLY');
      const total = consultationFee + iftCharge + tensCharge;

      expect(consultationFee).toBe(0); // No consultation fee for MACHINE_ONLY
      expect(iftCharge).toBe(150); // STANDARD services are charged in MACHINE_ONLY
      expect(tensCharge).toBe(100);
      expect(total).toBe(250);
    });

    it('should calculate correct total for MACHINE_ONLY with mixed services', () => {
      // Scenario: Machine-only with IFT (STANDARD, ₹150) and Cupping (PREMIUM, ₹500)
      const consultationFee = calculateConsultationFee('MACHINE_ONLY');
      const iftCharge = calculateServiceCharge(150, 'STANDARD', 'MACHINE_ONLY');
      const cuppingCharge = calculateServiceCharge(500, 'PREMIUM', 'MACHINE_ONLY');
      const total = consultationFee + iftCharge + cuppingCharge;

      expect(consultationFee).toBe(0);
      expect(iftCharge).toBe(150);
      expect(cuppingCharge).toBe(500);
      expect(total).toBe(650);
    });
  });
});
