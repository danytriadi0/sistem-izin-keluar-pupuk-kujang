/**
 * AUTH DATA - KUJANG ID (IDENTITY PROVIDER PT PUPUK KUJANG)
 * Daftar akun resmi untuk simulasi login multi-aktor (Karyawan, Atasan 1, Atasan 2, Pos Jaga, Admin)
 */

window.KUJANG_ACCOUNTS = [
  {
    id: 'emp_01',
    role: 'karyawan',
    username: 'karyawan',
    email: 'budi.pratama@pupuk-kujang.co.id',
    nip: 'PK-2024-8841',
    name: 'Budi Pratama, S.T.',
    title: 'Staf Rekayasa Mesin',
    department: 'Departemen Rekayasa & Pemeliharaan',
    phone: '0812-8841-0001',
    password: '123',
    avatar: '👨‍💼',
    badgeColor: '#059669',
    roleLabel: 'Karyawan Pemohon'
  },
  {
    id: 'emp_02',
    role: 'karyawan2',
    username: 'karyawan2',
    email: 'arthur.morgan@pupuk-kujang.co.id',
    nip: 'PK-2024-8842',
    name: 'Arthur Morgan, S.Tr.T.',
    title: 'Staf Instrumentasi & Otomasi Pabrik',
    department: 'Departemen Rekayasa & Pemeliharaan',
    phone: '0812-8841-0006',
    password: '123',
    avatar: '🤠',
    badgeColor: '#059669',
    roleLabel: 'Karyawan Pemohon 2',
    directSupervisor: 'Ir. Hendra Gunawan, M.T.'
  },
  {
    id: 'emp_moreno',
    role: 'karyawan',
    username: 'moreno',
    email: 'moreno.ardiansyah@pupuk-kujang.co.id',
    nip: 'PK-2024-8845',
    name: 'Moreno Ardiansyah, S.T.',
    title: 'Staf Rekayasa Pemeliharaan',
    department: 'Departemen Rekayasa & Pemeliharaan',
    phone: '0812-8845-0010',
    password: '123',
    avatar: '👨‍🔧',
    badgeColor: '#059669',
    roleLabel: 'Karyawan Pemohon (Moreno)',
    directSupervisor: 'Ir. Hendra Gunawan, M.T.'
  },
  {
    id: 'emp_gusti',
    role: 'karyawan',
    username: 'gusti',
    email: 'gusti.pratama@pupuk-kujang.co.id',
    nip: 'PK-2024-8846',
    name: 'Gusti Pratama, S.Tr.T.',
    title: 'Staf Instrumentasi Lapangan',
    department: 'Departemen Rekayasa & Pemeliharaan',
    phone: '0812-8846-0011',
    password: '123',
    avatar: '👨‍💼',
    badgeColor: '#059669',
    roleLabel: 'Karyawan Pemohon (Gusti)',
    directSupervisor: 'Dewi Sartika, S.T., M.M.'
  },
  {
    id: 'emp_bima',
    role: 'karyawan',
    username: 'bima',
    email: 'bima.arya@pupuk-kujang.co.id',
    nip: 'PK-2024-8847',
    name: 'Bima Arya Nugraha, S.T.',
    title: 'Staf Sistem Kontrol Pabrik',
    department: 'Departemen Rekayasa & Pemeliharaan',
    phone: '0812-8847-0012',
    password: '123',
    avatar: '👷‍♂️',
    badgeColor: '#059669',
    roleLabel: 'Karyawan Pemohon (Bima)',
    directSupervisor: 'Dewi Sartika, S.T., M.M.'
  },
  {
    id: 'mgr_01',
    role: 'approver',
    approverLevel: 1,
    username: 'atasan1',
    email: 'hendra.gunawan@pupuk-kujang.co.id',
    nip: 'PK-2015-1002',
    name: 'Ir. Hendra Gunawan, M.T.',
    title: 'Manager Rekayasa & Pemeliharaan',
    department: 'Departemen Rekayasa & Pemeliharaan',
    phone: '0813-1122-0002',
    password: '123',
    avatar: '👔',
    badgeColor: '#0f766e',
    roleLabel: 'Atasan 1 (Manager)'
  },
  {
    id: 'vp_01',
    role: 'approver2',
    approverLevel: 2,
    username: 'atasan2',
    email: 'dewi.sartika@pupuk-kujang.co.id',
    nip: 'PK-2012-0845',
    name: 'Dewi Sartika, S.T., M.M.',
    title: 'Supervisor Operasional Lapangan (Plt. Manager)',
    department: 'Departemen Rekayasa & Pemeliharaan',
    phone: '0813-3344-0003',
    password: '123',
    avatar: '👩‍💼',
    badgeColor: '#0369a1',
    roleLabel: 'Atasan 2 (Supervisor / Plt)'
  },
  {
    id: 'sec_01',
    role: 'security',
    username: 'posjaga',
    email: 'pos1.security@pupuk-kujang.co.id',
    nip: 'SEC-2018-042',
    name: 'Sertu Agus',
    title: 'Petugas Pengamanan Pos 1',
    department: 'Departemen Pengamanan & K3',
    phone: '0815-5566-0004',
    password: '123',
    avatar: '👮',
    badgeColor: '#1d4ed8',
    roleLabel: 'Petugas Pos Jaga'
  },
  {
    id: 'adm_01',
    role: 'admin',
    username: 'admin',
    email: 'bambang.sutrisno@pupuk-kujang.co.id',
    nip: 'ADM-2016-019',
    name: 'Bambang Sutrisno, S.T.',
    title: 'Supervisi Pengamanan & K3',
    department: 'Departemen Pengamanan & K3',
    phone: '0811-7788-0005',
    password: '123',
    avatar: '🛡️',
    badgeColor: '#7c3aed',
    roleLabel: 'Administrator Pengamanan & K3'
  },
  {
    id: 'mgr_02',
    role: 'approver',
    approverLevel: 1,
    username: 'ahmad',
    email: 'ahmad.subagja@pupuk-kujang.co.id',
    nip: 'PK-2012-0543',
    name: 'Dr. Ahmad Subagja, M.M.',
    title: 'Manager Produksi Amonia-1A',
    department: 'Departemen Produksi Amonia-1A',
    phone: '0813-1122-0099',
    password: '123',
    avatar: '👔',
    badgeColor: '#0f766e',
    roleLabel: 'Atasan 1 (Manager)'
  }
];

/**
 * Cari akun berdasarkan username / email / nip
 */
window.findKujangAccount = function(identifier) {
  if (!identifier) return null;
  const q = String(identifier).trim().toLowerCase();

  // 1. Cek apakah akun terdaftar di riwayat penghapusan oleh Admin
  let deletedList = [];
  try {
    deletedList = JSON.parse(localStorage.getItem('KUJANG_DELETED_USERS') || '[]');
  } catch (e) {}
  const isDeleted = deletedList.find(d =>
    (d.nip && d.nip.toLowerCase() === q) ||
    (d.kujangId && d.kujangId.toLowerCase() === q) ||
    (d.name && d.name.toLowerCase() === q) ||
    (q === 'hendra' && (d.nip === 'PK-2015-1002' || (d.name && d.name.toLowerCase().includes('hendra'))))
  );
  if (isDeleted) {
    return {
      id: isDeleted.kujangId || 'deleted_user',
      kujangId: isDeleted.kujangId || '',
      role: isDeleted.role || 'karyawan',
      roleKey: isDeleted.roleKey || isDeleted.role || 'karyawan',
      username: q,
      email: isDeleted.email || '',
      nip: isDeleted.nip || '',
      name: isDeleted.name || 'Pengguna',
      status: 'Dihapus',
      isDeleted: true
    };
  }

  const users = (typeof window.loadUsers === 'function' ? window.loadUsers() : window.MOCK_USERS) || [];
  const foundUser = users.find(u =>
    (u.nip && u.nip.toLowerCase() === q) ||
    (u.email && u.email.toLowerCase() === q) ||
    (u.kujangId && u.kujangId.toLowerCase() === q) ||
    (u.name && u.name.toLowerCase() === q)
  );
  if (foundUser) {
    const rawAccount = (window.KUJANG_ACCOUNTS || []).find(a => a.nip === foundUser.nip || a.username === q);
    return {
      id: rawAccount ? rawAccount.id : foundUser.kujangId,
      kujangId: foundUser.kujangId,
      role: foundUser.roleKey || (rawAccount ? rawAccount.role : 'karyawan'),
      roleKey: foundUser.roleKey || (rawAccount ? rawAccount.roleKey : 'karyawan'),
      username: rawAccount ? rawAccount.username : (foundUser.nip ? foundUser.nip.toLowerCase() : q),
      email: foundUser.email,
      nip: foundUser.nip,
      name: foundUser.name,
      title: foundUser.role || (rawAccount ? rawAccount.title : 'Karyawan'),
      department: foundUser.department,
      phone: rawAccount ? rawAccount.phone : '0812-3456-7890',
      password: rawAccount ? rawAccount.password : '123',
      status: foundUser.status || 'Aktif',
      roleLabel: foundUser.role || (rawAccount ? rawAccount.roleLabel : 'Karyawan'),
      directSupervisor: foundUser.directSupervisor || foundUser.supervisor
    };
  }
  const rawFallback = (window.KUJANG_ACCOUNTS || []).find(acc => 
    acc.username.toLowerCase() === q ||
    acc.email.toLowerCase() === q ||
    acc.nip.toLowerCase() === q
  );
  if (rawFallback) {
    const isRawDeleted = deletedList.find(d => d.nip === rawFallback.nip || d.kujangId === rawFallback.id || (d.name && d.name.toLowerCase() === rawFallback.name.toLowerCase()));
    if (isRawDeleted) {
      return {
        ...rawFallback,
        status: 'Dihapus',
        isDeleted: true
      };
    }
    return rawFallback;
  }
  return null;
};
